import { useEffect, useReducer } from 'react';
import { getSnowboarders, getUserTeam } from '../../airtable-utils';
import { removeDupes } from 'utils/utils';
import { roundOneMatchups, roundTwoMatchups } from './matchups';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROUND_ONE_MATCHUPS':
      return {
        ...state,
        roundOneMatchups: action.roundOneMatchups,
        isRoundOneLoading: action.isRoundOneLoading,
      };
    case 'SET_ROUND_TWO_MATCHUPS':
      return {
        ...state,
        roundTwoMatchups: action.roundTwoMatchups,
        isRoundTwoLoading: action.isRoundTwoLoading,
      };
    default:
      return state;
  }
};

const initialState = {
  roundOneMatchups: [],
  roundTwoMatchups: [],
  isRoundOneLoading: true,
  isRoundTwoLoading: true,
  isRoundThreeLoading: true,
};

const setRoundOneMatchups = ({ snowboarders = [] }) => {
  return roundOneMatchups.map(currentRound => {
    for (let i = 0; i < snowboarders.length; i++) {
      const currentSnowboarder = snowboarders[i];
      const isSnowboarderInCurrentRound =
        currentRound.acceptedRoundOneIds.includes(currentSnowboarder.matchupId);
      if (isSnowboarderInCurrentRound) {
        currentRound.snowboarders.push(currentSnowboarder);
      }
    }
    currentRound.snowboarders = removeDupes(currentRound.snowboarders);
    return currentRound;
  });
};

const setRoundTwoMatchups = ({ roundOneWinners = [] }) => {
  return roundTwoMatchups.map(currentRound => {
    for (let i = 0; i < roundOneWinners.length; i++) {
      const currentSnowboarder = roundOneWinners[i];
      const isSnowboarderInCurrentRound =
        currentRound.acceptedRoundOneIds.includes(
          currentSnowboarder.matchupId.split('_P')[0]
        );
      if (isSnowboarderInCurrentRound) {
        currentRound.snowboarders.push(currentSnowboarder);
      }
    }
    currentRound.snowboarders = removeDupes(currentRound.snowboarders);
    return currentRound;
  });
};

export default function useMatchupData() {
  const [allMatchups, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const updateRoundOnematchups = async () => {
      const { snowboarders, loading } = await getSnowboarders();
      const roundOneMatchups = setRoundOneMatchups({ snowboarders });
      await dispatch({
        type: 'SET_ROUND_ONE_MATCHUPS',
        roundOneMatchups,
        isRoundOneLoading: loading,
      });
    };

    const updateRoundTwoMatchups = async () => {
      const { userTeam, loading } = await getUserTeam({ name: 'Orry' });
      const hasSelectedWinners = userTeam.round1Winners.length > 0;
      if (hasSelectedWinners) {
        const roundTwoMatchups = setRoundTwoMatchups({
          roundOneWinners: userTeam.round1Winners,
        });
        await dispatch({
          type: 'SET_ROUND_TWO_MATCHUPS',
          roundTwoMatchups,
          isRoundTwoLoading: loading,
        });
      }
    };
    const runUseEffect = async () => {
      await updateRoundOnematchups();
      await updateRoundTwoMatchups();
    };
    runUseEffect();
    () => runUseEffect();
  }, []);

  return allMatchups;
}
