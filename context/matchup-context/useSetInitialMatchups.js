import { useEffect } from 'react';
import {
  getRoundFourMatchup,
  getRoundTwoMatchups,
  getRoundThreeMatchups,
  getWinner,
  getRoundOneMatchups,
} from './matchups';
import { transformMatchupsObjectIntoArray } from './matchup-utils';

const addSnowboardersToMatchups = ({ snowboarders = [] }) => {
  const roundOneMatchups = getRoundOneMatchups();
  for (let i = 0; i < snowboarders.length; i++) {
    const currentSnowboarder = snowboarders[i];
    const currentSnowboardersRoundOneMatchupId = currentSnowboarder.matchupId;
    const currentRound = roundOneMatchups[currentSnowboardersRoundOneMatchupId];
    // limit the array to 2 to avoid pushing duplicates
    if (currentRound?.snowboarders?.length < 2) {
      currentRound.snowboarders.push(currentSnowboarder);
    }
  }
  const formattedRoundOneMatchups =
    transformMatchupsObjectIntoArray(roundOneMatchups);
  return formattedRoundOneMatchups;
};

export const useSetInitialMatchups = ({ snowboarders = [], dispatch }) => {
  useEffect(() => {
    if (snowboarders.length > 0) {
      const setRoundOneMatchups = async () => {
        const roundOneMatchups = addSnowboardersToMatchups({
          snowboarders,
        });
        const roundTwoMatchups = transformMatchupsObjectIntoArray(
          getRoundTwoMatchups({})
        );
        const roundThreeMatchups = transformMatchupsObjectIntoArray(
          getRoundThreeMatchups({})
        );
        const roundFourMatchup = transformMatchupsObjectIntoArray(
          getRoundFourMatchup({})
        );

        const winner = transformMatchupsObjectIntoArray(getWinner({}));
        await dispatch({
          type: 'SET_ROUND_ONE_MATCHUPS',
          roundOneMatchups,
          roundTwoMatchups,
          roundThreeMatchups,
          roundFourMatchup,
          winner,
        });
      };
      setRoundOneMatchups();
    }
  }, [dispatch, snowboarders]);
};
