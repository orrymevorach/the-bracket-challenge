import { useEffect } from 'react';
import {
  getFinalMatchup,
  getQuarterFinalMatchups,
  getSemiFinalMatchups,
  getWinner,
  getRoundOneMatchups,
} from './matchups';
import { transformMatchupsObjectIntoArray } from './matchup-utils';
import useGetSnowboarders from './useGetSnowboarders';

const addSnowboardersToMatchups = ({ snowboarders = [] }) => {
  const roundOneMatchups = getRoundOneMatchups();
  for (let i = 0; i < snowboarders.length; i++) {
    const currentSnowboarder = snowboarders[i];
    const currentSnowboardersRoundOneMatchupId = currentSnowboarder.matchupId;
    const currentRound = roundOneMatchups[currentSnowboardersRoundOneMatchupId];
    // limit the array to 2 to avoid pushing duplicates
    if (currentRound.snowboarders.length < 2) {
      currentRound.snowboarders.push(currentSnowboarder);
    }
  }
  const formattedRoundOneMatchups =
    transformMatchupsObjectIntoArray(roundOneMatchups);
  return formattedRoundOneMatchups;
};

export const useSetInitialMatchups = ({ dispatch }) => {
  const snowboarders = useGetSnowboarders();
  useEffect(() => {
    if (snowboarders.length > 0) {
      const setRoundOneMatchups = async () => {
        const roundOneMatchups = addSnowboardersToMatchups({ snowboarders });
        const quarterFinalMatchups = transformMatchupsObjectIntoArray(
          getQuarterFinalMatchups({})
        );
        const semiFinalMatchups = transformMatchupsObjectIntoArray(
          getSemiFinalMatchups({})
        );
        const finalsMatchup = transformMatchupsObjectIntoArray(
          getFinalMatchup({})
        );

        const winner = transformMatchupsObjectIntoArray(getWinner({}));
        await dispatch({
          type: 'SET_ROUND_ONE_MATCHUPS',
          roundOneMatchups,
          quarterFinalMatchups,
          semiFinalMatchups,
          finalsMatchup,
          winner,
        });
      };
      setRoundOneMatchups();
    }
  }, [dispatch, snowboarders]);
};
