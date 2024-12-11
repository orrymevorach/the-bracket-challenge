import {
  addRank,
  mapRoundToPoints,
} from '@/pages/api/rankings/bracket-ranking-utils';
import {
  getBracket,
  getMatchupsBySport,
  getSnowboardersBySport,
} from '@/lib/airtable';
import { getRecordsByFieldValue, updateRecord } from '@/lib/airtable-utils';

export default async function handler(req, res) {
  const { sport, subBracket } = { ...req.body, ...req.query };

  //   Get snowboarders
  const { snowboarders } = await getSnowboardersBySport({ sport });
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
  const { records: leagues } = await getRecordsByFieldValue({
    tableId: 'Leagues',
    fieldName: 'Sport',
    fieldValue: sport,
  });
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
        const selections = bracketData.selections
          ? JSON.parse(bracketData.selections)
          : [];

        const rankData = {
          correctPicks: 0,
          totalPoints: 0,
          numberOfWinners: 0,
        };

        // Calculate the points and number of correct picks for each bracket
        const selectionsWithRankings = selections.map(subBracketData => {
          if (subBracketData.subBracket === subBracket) {
            // let totalPoints = subBracketData.totalPoints || 0;
            // let correctPicks = subBracketData.correctPicks || 0;
            // let numberOfWinners = subBracketData.numberOfWinners || 0;
            for (let winner of winners) {
              const { matchupId, winner: actualWinner, points } = winner;
              if (subBracketData[matchupId] === actualWinner) {
                // correctPicks += 1;
                // totalPoints += points;
                // numberOfWinners += 1;

                rankData.correctPicks += 1;
                rankData.totalPoints += points;
                rankData.numberOfWinners += 1;
              } else {
                // numberOfWinners += 1;
                rankData.numberOfWinners += 1;
              }
              // subBracketData.totalPoints = totalPoints;
              // subBracketData.correctPicks = correctPicks;
              // subBracketData.numberOfWinners = numberOfWinners;
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
    await updateRecord({
      tableId: 'Leagues',
      recordId: leagueId,
      newFields: {
        json: JSON.stringify(bracketsRanked),
      },
    });
    res.status(200).json({ bracketsRanked });
  }
}
