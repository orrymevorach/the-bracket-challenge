import { getWinners } from '@/lib/airtable';
import { useState, useEffect } from 'react';

const useGetWinners = () => {
  const [winners, setWinners] = useState([]);
  useEffect(() => {
    const getRoundWinners = async () => {
      const roundWinners = await getWinners({ name: 'Mens Winners' });
      setWinners(roundWinners);
    };
    getRoundWinners();
  }, []);
  return winners;
};

export default function useApplyLiveResults({ matchupData }) {
  const { allMatchups, dispatch, hasCorrectWinners, hasSetUserSelections } =
    matchupData;
  const winners = useGetWinners();
  useEffect(() => {
    // prevents and infinite loop
    if (hasSetUserSelections && !hasCorrectWinners) {
      const allRoundsAsArray = Object.entries(allMatchups);
      const allRoundsUpdatedWithLiveResults = allRoundsAsArray.reduce(
        (acc, [roundName, roundMatchups]) => {
          const roundMatchupsWithLiveResults = roundMatchups.map(matchup => {
            const { matchupId } = matchup;
            const formattedMatchupId = matchupId // formatted to match matchupId format from airtable
              .replace('R', 'r')
              .replace('_', '');
            const currentWinner = winners[formattedMatchupId];
            if (currentWinner) {
              matchup.correctWinner = currentWinner[0];
              return matchup;
            }
            return matchup;
          });
          acc[roundName] = roundMatchupsWithLiveResults;
          return acc;
        },
        {}
      );
      dispatch({
        type: 'SET_CORRECT_WINNERS',
        ...allRoundsUpdatedWithLiveResults,
      });
    }
  }, [allMatchups, dispatch, winners, hasSetUserSelections, hasCorrectWinners]);
}
