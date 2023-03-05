import { useEffect } from 'react';
import { getSnowboarders } from '../../airtable-utils';
import {
  getFinalMatchup,
  getQuarterFinalMatchups,
  getSemiFinalMatchups,
  getWinner,
  getRoundOneMatchups,
} from './matchups';
import { transformMatchupsObjectIntoArray } from './matchup-utils';

const addSnowboardersToMatchups = ({ snowboarders = [] }) => {
  const roundOneMatchups = getRoundOneMatchups();
  for (let i = 0; i < snowboarders.length; i++) {
    const currentSnowboarder = snowboarders[i];
    const currentSnowboardersRoundOneMatchupId =
      currentSnowboarder.matchupId.split('_P')[0];
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
  useEffect(() => {
    const setRoundOneMatchups = async () => {
      const { snowboarders } = await getSnowboarders();
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
  }, [dispatch]);
};
