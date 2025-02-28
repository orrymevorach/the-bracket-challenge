import {
  addRank,
  mapRoundToPoints,
} from '@/pages/api/rankings/bracket-ranking-utils';
import {
  getBracket,
  getLeaguesBySport,
  getSnowboardersBySport,
} from '@/lib/firebase';
import { getMatchupsBySport } from '@/lib/airtable';
import { updateRecord } from '@/lib/firebase-utils';
import { TABLES } from '@/utils/constants';

export default async function handler(req, res) {
  const { sport, subBracket } = { ...req.body, ...req.query };

  //   Get snowboarders
  const snowboarders = await getSnowboardersBySport({ sport });
  const snowboarderAsMap = snowboarders.reduce((acc, snowboarder) => {
    acc[snowboarder.id] = snowboarder.name;
    return acc;
  }, {});

  //   Get matchups in current sport
  const matchups = await getMatchupsBySport({ sport });

  //   get winners for each matchup
  let winners = [];
  for (let matchup of matchups) {
    if (matchup.actualWinner) {
      const round = parseFloat(matchup.round);
      const points = mapRoundToPoints[round];
      winners.push({
        matchupId: matchup.matchupId,
        winner: snowboarderAsMap[matchup.actualWinner[0]],
        points,
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
          numberOfWinners: 0,
        };

        // Calculate the points and number of correct picks for each bracket
        const selectionsWithRankings = selections.map(subBracketData => {
          if (subBracketData.subBracket === subBracket) {
            for (let winner of winners) {
              const { matchupId, winner: actualWinner, points } = winner;
              if (subBracketData[matchupId] === actualWinner) {
                rankData.correctPicks += 1;
                rankData.totalPoints += points;
                rankData.numberOfWinners += 1;
              } else {
                rankData.numberOfWinners += 1;
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
    // Add rankings to each bracket based on the total points
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
      results.push(`Successfuly updated ${leagueId}`);
    } catch (error) {
      console.error(`Error updating ${leagueId} rankings:`, error);
      results.push(`Failed to update ${leagueId}`);
    }
  }
  res.status(200).json(results);
}
