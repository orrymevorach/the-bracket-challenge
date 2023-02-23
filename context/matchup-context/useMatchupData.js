import { useEffect, useReducer } from 'react';
import { getSnowboarders } from '../../airtable-utils';
import { removeDupes } from 'utils/utils';
import {
  roundOneMatchups,
  quarterFinalMatchups,
  semiFinalMatchups,
  finalsMatchup,
  winner,
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
    case 'SET_QUARTER_FINAL_MATCHUPS':
      return {
        ...state,
        quarterFinalMatchups: action.quarterFinalMatchups,
      };
    case 'SET_SEMI_FINAL_MATCHUPS':
      return {
        ...state,
        semiFinalMatchups: action.semiFinalMatchups,
      };
    case 'SET_FINALS_MATCHUP':
      return {
        ...state,
        finalsMatchup: action.finalsMatchup,
      };
    case 'SET_WINNER':
      return {
        ...state,
        winner: action.winner,
      };
    default:
      return state;
  }
};

const initialState = {
  roundOneMatchups: [],
  quarterFinalMatchups: [],
  semiFinalMatchups: [],
  finalsMatchup: [],
  winner: [],
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
    acceptedMatchups: quarterFinalMatchups,
    dispatchKey: 'SET_QUARTER_FINAL_MATCHUPS',
    actionKey: 'quarterFinalMatchups',
  },
  3: {
    airtableColumn: 'semiFinalMatchups',
    acceptedMatchups: semiFinalMatchups,
    dispatchKey: 'SET_SEMI_FINAL_MATCHUPS',
    actionKey: 'semiFinalMatchups',
  },
  4: {
    airtableColumn: 'finalsMatchup',
    acceptedMatchups: finalsMatchup,
    dispatchKey: 'SET_FINALS_MATCHUP',
    actionKey: 'finalsMatchup',
  },
  5: {
    airtableColumn: 'winner',
    acceptedMatchups: winner,
    dispatchKey: 'SET_WINNER',
    actionKey: 'winner',
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
        await updatedRoundMatchups({ roundNumber: 5 });
      }
    };
    runUseEffect();
    () => runUseEffect();
  }, [userTeam]);

  return allMatchups;
}
