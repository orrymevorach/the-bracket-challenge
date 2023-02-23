import { useEffect, useReducer } from 'react';
import { getSnowboarders, getUserTeam } from '../../airtable-utils';
import { removeDupes } from 'utils/utils';
import {
  roundOneMatchups,
  roundTwoMatchups,
  roundThreeMatchups,
} from './matchups';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROUND_ONE_MATCHUPS':
      return {
        ...state,
        roundOneMatchups: action.roundOneMatchups,
        isRoundOneLoading: action.isLoading,
      };
    case 'SET_ROUND_TWO_MATCHUPS':
      return {
        ...state,
        roundTwoMatchups: action.roundTwoMatchups,
        isRoundTwoLoading: action.isLoading,
      };
    case 'SET_ROUND_THREE_MATCHUPS':
      return {
        ...state,
        roundThreeMatchups: action.roundThreeMatchups,
        isRoundThreeLoading: action.isLoading,
      };
    default:
      return state;
  }
};

const initialState = {
  roundOneMatchups: [],
  roundTwoMatchups: [],
  roundThreeMatchups: [],
  isRoundOneLoading: true,
  isRoundTwoLoading: true,
  isRoundThreeLoading: true,
};

const setRoundOneMatchups = ({ snowboarders = [] }) => {
  return roundOneMatchups.map(currentRound => {
    for (let i = 0; i < snowboarders.length; i++) {
      const currentSnowboarder = snowboarders[i];
      const isSnowboarderInCurrentRound =
        currentRound.acceptedRoundIds.includes(currentSnowboarder.matchupId);
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
        currentRound.acceptedRoundIds.includes(
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

const setRoundThreeMatchups = ({ roundTwoWinners = [] }) => {
  return roundThreeMatchups.map(currentRound => {
    for (let i = 0; i < roundTwoWinners.length; i++) {
      const currentSnowboarder = roundTwoWinners[i];
      const isSnowboarderInCurrentRound =
        currentRound.acceptedRoundIds.includes(
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
      const { snowboarders, isLoading } = await getSnowboarders();
      const roundOneMatchups = setRoundOneMatchups({ snowboarders });
      await dispatch({
        type: 'SET_ROUND_ONE_MATCHUPS',
        roundOneMatchups,
        isLoading,
      });
    };

    const updateRoundTwoMatchups = async () => {
      const { userTeam, isLoading } = await getUserTeam({ name: 'Orry' });
      const hasSelectedWinners = userTeam.round1Winners.length > 0;
      if (hasSelectedWinners) {
        const roundTwoMatchups = setRoundTwoMatchups({
          roundOneWinners: userTeam.round1Winners,
        });
        await dispatch({
          type: 'SET_ROUND_TWO_MATCHUPS',
          roundTwoMatchups,
          isLoading,
        });
      }
    };

    const updateRoundThreeMatchups = async () => {
      const { userTeam, isLoading } = await getUserTeam({ name: 'Orry' });
      const hasSelectedWinners = userTeam.round1Winners.length > 0;
      if (hasSelectedWinners) {
        const roundThreeMatchups = setRoundThreeMatchups({
          roundTwoWinners: userTeam.round2Winners,
        });
        await dispatch({
          type: 'SET_ROUND_THREE_MATCHUPS',
          roundThreeMatchups,
          isLoading,
        });
      }
    };
    const runUseEffect = async () => {
      await updateRoundOnematchups();
      await updateRoundTwoMatchups();
      await updateRoundThreeMatchups();
    };
    runUseEffect();
    () => runUseEffect();
  }, []);

  return allMatchups;
}
