import { useUser } from 'context/user-context/user-context';
import { useEffect } from 'react';
import { getSnowboarders } from '../../airtable-utils';
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
  const { userTeam } = useUser();
  useEffect(() => {
    const setRoundOneMatchups = async () => {
      const { snowboarders, isLoading } = await getSnowboarders();
      const roundOneMatchups = addSnowboardersToMatchups({ snowboarders });
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

    const runUseEffect = async () => {
      if (userTeam) {
        await setRoundOneMatchups();
      }
    };
    runUseEffect();
    () => runUseEffect();
  }, [userTeam, dispatch]);
};
