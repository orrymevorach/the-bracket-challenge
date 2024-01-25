import { getWinners } from '@/lib/airtable';
import { sortBracketByRound } from './add-user-selections-to-rounds';
import { isEven } from '@/utils/utils';

function addActualWinnerToMatchups({ player, matchups, matchupId }) {
  const round = parseFloat(matchupId.split('_M')[0].replace('R', ''));
  const position = parseFloat(matchupId.split('_M')[1]);
  // Determining the next round number
  const nextRound = round + 1;
  // Determining the next matchup number. If a position is even, dividing it by 2 gives you the next matchup number. If it is odd, first add 1, then divide it by 2.
  const nextMatchup = isEven(position) ? position / 2 : (position + 1) / 2;
  // Create the matchupId for this players next round.
  const nextMatchupId = `R${nextRound}_M${nextMatchup}`;
  const updatedMatchups = matchups.map(matchup => {
    // Add the winner of the current matchup to the corresponding next matchup
    if (matchup.matchupId === nextMatchupId) {
      if (!matchup.actualWinner) {
        matchup.actualWinner = {};
        matchup.actualWinner.team1 = player;
      } else {
        matchup.actualWinner.team2 = player;
      }
    }
    return matchup;
  });
  return updatedMatchups;
}

export default async function handler(req, res) {
  const { matchups } = req.body;

  const winners = await getWinners();

  const winnersSortedByRound = sortBracketByRound({ bracket: winners });
  const sortedWinnersAsArray = Object.entries(winnersSortedByRound);

  const updatedMatchups = sortedWinnersAsArray.reduce((acc, roundData) => {
    const [roundName, roundSelections] = roundData;
    const selectionsArray = Object.entries(roundSelections);
    let updatedMatchups = [];
    for (let matchup of selectionsArray) {
      const matchupId = matchup[0];
      const player = matchup[1][0];
      updatedMatchups = addActualWinnerToMatchups({
        player,
        matchups: matchups[roundName],
        matchupId,
      });
    }
    acc[roundName] = updatedMatchups;
    return acc;
  }, {});

  res.status(200).json({ matchups: updatedMatchups });
}
