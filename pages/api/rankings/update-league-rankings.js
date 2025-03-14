import {
  addRank,
  mapRoundToPoints,
} from '@/pages/api/rankings/bracket-ranking-utils';
import {
  getBracket,
  getLeaguesBySport,
  getSnowboardersBySport,
} from '@/lib/firebase';
import {
  getMatchupsBySport,
  getQuestionsBySport,
  getSessionsBySport,
} from '@/lib/airtable';
import { updateRecord } from '@/lib/firebase-utils';
import { TABLES } from '@/utils/constants';

export default async function handler(req, res) {
  const { sport } = { ...req.body, ...req.query };

  //   Get snowboarders
  const snowboarders = await getSnowboardersBySport({ sport });
  const snowboarderAsMap = snowboarders.reduce((acc, snowboarder) => {
    acc[snowboarder.id] = snowboarder.name;
    return acc;
  }, {});

  //   Get matchups in current sport
  const matchups = await getMatchupsBySport({ sport });
  const sessions = await getSessionsBySport({ sport });
  const questions = await getQuestionsBySport({ sport });

  //   get winners for each matchup
  let winners = [];
  let numberOfWinners = 0;
  for (let matchup of matchups) {
    if (matchup.actualWinner) {
      const round = parseFloat(matchup.round);
      const points = mapRoundToPoints[round];
      numberOfWinners += 1;
      winners.push({
        matchupId: matchup.matchupId,
        winner: snowboarderAsMap[matchup.actualWinner[0]],
        points,
        subBracket: matchup.subBracket[0],
        contest: matchup.contest[0],
        display: 'matchup',
      });
    }
  }

  for (let question of questions) {
    if (question.winner) {
      numberOfWinners += 1;
      winners.push({
        matchupId: question.question,
        winner: question.winner[0],
        points: question.points,
        subBracket: question.subBracket[0],
        contest: question.contest[0],
        display: 'question',
      });
    }
  }

  for (let session of sessions) {
    if (session.winners) {
      const sessionWinners = [];
      for (let winner of session.winners) {
        const snowboarder = snowboarderAsMap[winner];
        sessionWinners.push(snowboarder);
        numberOfWinners += 1;
      }
      const points = 15;
      winners.push({
        matchupId: session.name,
        winner: sessionWinners,
        points,
        subBracket: session.subBracket[0],
        contest: session.contest[0],
        display: 'session',
      });
    }
  }

  //   Get all leagues for the sport, get all brackets for each league, and update rankings
  const leagues = await getLeaguesBySport({ sport });
  let results = [];
  for (let leagueData of leagues) {
    const bracketIds = leagueData?.userBrackets;
    if (!bracketIds) {
      return leagueData;
    }
    const bracketsWithScoringData = await Promise.all(
      bracketIds.map(async bracketId => {
        const bracketData = await getBracket({
          recId: bracketId,
        });
        // Bracket selections
        const selections = bracketData.selections || [];
        const rankData = {
          correctPicks: 0,
          totalPoints: 0,
          numberOfWinners,
        };
        // Calculate the points and number of correct picks for each bracket
        const selectionsWithRankings = selections.map(subBracketData => {
          const subBracketMatchupId =
            Object.keys(subBracketData).find(
              key => key !== 'name' && key !== 'subBracket'
            ) || null;

          for (let winner of winners) {
            if (
              winner.contest === subBracketData.name &&
              winner.subBracket === subBracketData.subBracket
            ) {
              const {
                matchupId,
                winner: actualWinner,
                points,
                display,
              } = winner;
              if (display === 'matchup') {
                if (subBracketData[matchupId] === actualWinner) {
                  rankData.correctPicks += 1;
                  rankData.totalPoints += points;
                }
              }
              if (display === 'session') {
                if (subBracketMatchupId && subBracketMatchupId === matchupId) {
                  const sessionWinners = subBracketData[matchupId];
                  for (let winnerName of actualWinner) {
                    if (sessionWinners.includes(winnerName)) {
                      rankData.correctPicks += 1;
                      rankData.totalPoints += points;
                    }
                  }
                }
              }
              if (display === 'question') {
                if (subBracketData[matchupId] === actualWinner) {
                  rankData.correctPicks += 1;
                  rankData.totalPoints += points;
                }
              }
            }
          }
          return subBracketData;
        });
        return {
          bracketName: bracketData.name,
          id: bracketId,
          selections: selectionsWithRankings,
          rankData,
        };
      })
    );
    //   // Add rankings to each bracket based on the total points
    const bracketsRanked = addRank(bracketsWithScoringData);
    const leagueId = leagueData.id;
    if (!leagueId) {
      continue;
    }
    try {
      await updateRecord({
        tableId: TABLES.LEAGUES,
        recordId: leagueId,
        newFields: {
          json: bracketsRanked,
        },
      });
      results.push(`Successfuly updated league ${leagueId}`);
    } catch (error) {
      console.error(`Error updating league ${leagueId} rankings:`, error);
      results.push(`Failed to update league ${leagueId}`);
    }
  }
  res.status(200).json(results);
}
