import { useEffect, useReducer } from 'react';
import { getSnowboarders } from '../../airtable-utils';
import { removeDupes } from 'utils/utils';
import {
  roundOneMatchups,
  roundTwoMatchups,
  roundThreeMatchups,
  roundFourMatchups,
} from './matchups';
import { useUser } from 'context/user-context/user-context';

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
      };
    case 'SET_ROUND_THREE_MATCHUPS':
      return {
        ...state,
        roundThreeMatchups: action.roundThreeMatchups,
      };
    case 'SET_ROUND_FOUR_MATCHUPS':
      return {
        ...state,
        roundFourMatchups: action.roundFourMatchups,
      };
    default:
      return state;
  }
};

const initialState = {
  roundOneMatchups: [],
  roundTwoMatchups: [],
  roundThreeMatchups: [],
  roundFourMatchups: [],
  isRoundOneLoading: true,
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

const setRoundMatchups = ({ snowboarders = [], acceptedMatchups = [] }) => {
  return acceptedMatchups.map(currentRound => {
    for (let i = 0; i < snowboarders.length; i++) {
      const currentSnowboarder = snowboarders[i];
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

const mapRoundNumberToRoundData = {
  2: {
    airtableColumn: 'quarterFinalMatchups',
    acceptedMatchups: roundTwoMatchups,
    dispatchKey: 'SET_ROUND_TWO_MATCHUPS',
    actionKey: 'roundTwoMatchups',
  },
  3: {
    airtableColumn: 'semiFinalMatchups',
    acceptedMatchups: roundThreeMatchups,
    dispatchKey: 'SET_ROUND_THREE_MATCHUPS',
    actionKey: 'roundThreeMatchups',
  },
  4: {
    airtableColumn: 'finalsMatchup',
    acceptedMatchups: roundFourMatchups,
    dispatchKey: 'SET_ROUND_FOUR_MATCHUPS',
    actionKey: 'roundFourMatchups',
  },
};

export default function useMatchupData() {
  const [allMatchups, dispatch] = useReducer(reducer, initialState);
  const { userTeam } = useUser();

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

    const updatedRoundMatchups = async ({ roundNumber }) => {
      const { airtableColumn, acceptedMatchups, dispatchKey, actionKey } =
        mapRoundNumberToRoundData[roundNumber];
      const hasSelectedWinners = userTeam[airtableColumn].length > 0;
      if (hasSelectedWinners) {
        const updatedMatchup = setRoundMatchups({
          snowboarders: userTeam[airtableColumn],
          acceptedMatchups,
        });
        await dispatch({
          type: dispatchKey,
          [actionKey]: updatedMatchup,
        });
      }
    };

    const runUseEffect = async () => {
      if (userTeam) {
        await updateRoundOnematchups();
        await updatedRoundMatchups({ roundNumber: 2 });
        await updatedRoundMatchups({ roundNumber: 3 });
        await updatedRoundMatchups({ roundNumber: 4 });
      }
    };
    runUseEffect();
    () => runUseEffect();
  }, [userTeam]);

  return allMatchups;
}
