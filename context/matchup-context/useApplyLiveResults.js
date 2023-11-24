import { getWinners } from '@/lib/airtable';
import { useState, useEffect } from 'react';
import { sortBracketByRound } from './useGetUserBracketSelections';
import { isEmpty, isEven } from '@/utils/utils';

const useGetWinners = () => {
  const [winners, setWinners] = useState({});
  useEffect(() => {
    const getRoundWinners = async () => {
      const roundWinners = await getWinners();
      setWinners(roundWinners);
    };
    getRoundWinners();
  }, []);
  return winners;
};

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

export default function useApplyLiveResults({
  matchups,
  setMatchups,
  currentRound,
}) {
  const [hasData, setHasData] = useState(false);
  const winners = useGetWinners();
  const hasWinners = !isEmpty(winners);
  if (matchups.length && currentRound && hasWinners && !hasData) {
    const winnersSortedByRound = sortBracketByRound({ bracket: winners });
    const currentRoundWinners = winnersSortedByRound[currentRound];
    const selectionsArray = Object.entries(currentRoundWinners);

    let updatedMatchups = [];
    for (let matchup of selectionsArray) {
      const matchupId = matchup[0];
      const player = matchup[1][0];
      updatedMatchups = addActualWinnerToMatchups({
        player,
        matchups,
        matchupId,
      });
    }
    setMatchups(updatedMatchups);
    setHasData(true);
  }
}
