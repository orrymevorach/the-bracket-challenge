import { useEffect } from 'react';
import { getSnowboarders } from '../../airtable-utils/index';
import {
  getFinalMatchup,
  getQuarterFinalMatchups,
  getSemiFinalMatchups,
  roundOneMatchups,
} from './matchups';
import { transformMatchupsObjectIntoArray } from './matchup-utils';

const addSnowboardersToMatchups = ({ snowboarders = [] }) => {
  for (let i = 0; i < snowboarders.length; i++) {
    const currentSnowboarder = snowboarders[i];
    const currentSnowboardersRoundOneMatchupId =
      currentSnowboarder.matchupId.split('_P')[0];
    const currentRound = roundOneMatchups[currentSnowboardersRoundOneMatchupId];
    currentRound.snowboarders.push(currentSnowboarder);
  }
  const formattedRoundOneMatchups =
    transformMatchupsObjectIntoArray(roundOneMatchups);
  return formattedRoundOneMatchups;
};

export const useSetInitialMatchups = ({ dispatch }) => {
  console.log('use set init matchups');
  useEffect(() => {
    console.log('inside use effect');
    const setRoundOneMatchups = async () => {
      console.log('before getting snowboarders');
      const { snowboarders, isLoading } = await getSnowboarders();
      console.log('snowboarders', snowboarders);
      const roundOneMatchups = addSnowboardersToMatchups({ snowboarders });
      console.log('roundOneMatchups', roundOneMatchups);
      const quarterFinalMatchups = transformMatchupsObjectIntoArray(
        getQuarterFinalMatchups()
      );
      const semiFinalMatchups = transformMatchupsObjectIntoArray(
        getSemiFinalMatchups()
      );
      const finalsMatchup = transformMatchupsObjectIntoArray(getFinalMatchup());
      await dispatch({
        type: 'SET_ROUND_ONE_MATCHUPS',
        roundOneMatchups,
        isLoading,
        quarterFinalMatchups,
        semiFinalMatchups,
        finalsMatchup,
      });
    };
    return () => setRoundOneMatchups();
  }, [dispatch]);
};
