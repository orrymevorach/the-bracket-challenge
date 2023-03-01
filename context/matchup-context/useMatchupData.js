import { useReducer } from 'react';
import {
  roundOneMatchups,
  getQuarterFinalMatchups,
  getSemiFinalMatchups,
  getFinalMatchup,
  getWinner,
} from './matchups';
import { useSetInitialMatchups } from './useSetInitialMatchups';
import {
  transformMatchupsArrayToObject,
  transformMatchupsObjectIntoArray,
} from './matchup-utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROUND_ONE_MATCHUPS':
      return {
        ...state,
        roundOneMatchups: action.roundOneMatchups,
        quarterFinalMatchups: action.quarterFinalMatchups,
        semiFinalMatchups: action.semiFinalMatchups,
        finalsMatchup: action.finalsMatchup,
      };
    case 'SET_ROUND_ONE_WINNER':
      return {
        ...state,
        roundOneMatchups: action.roundOneMatchups,
        quarterFinalMatchups: action.quarterFinalMatchups,
      };
    case 'SET_QUARTER_FINAL_WINNER':
      return {
        ...state,
        quarterFinalMatchups: action.quarterFinalMatchups,
        semiFinalMatchups: action.semiFinalMatchups,
      };
    case 'SET_SEMI_FINAL_WINNER':
      return {
        ...state,
        semiFinalMatchups: action.semiFinalMatchups,
        finalsMatchup: action.finalsMatchup,
      };
    case 'SET_WINNER': {
      return {
        ...state,
        winner: action.winner,
      };
    }

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
};

export default function useMatchupData() {
  const [allMatchups, dispatch] = useReducer(reducer, initialState);

  useSetInitialMatchups({ dispatch });

  const setRoundOneWinner = player => {
    const { matchupId } = player;
    // Setting winner of current round
    const currentRound = roundOneMatchups[matchupId];
    currentRound.winner = player;

    // Get quarter final data using round one data
    const quarterFinalMatchups = getQuarterFinalMatchups(roundOneMatchups);

    // Format both rounds
    const formattedRoundOneMatchups =
      transformMatchupsObjectIntoArray(roundOneMatchups);
    const formattedQuarterFinalMatchups =
      transformMatchupsObjectIntoArray(quarterFinalMatchups);

    dispatch({
      type: 'SET_ROUND_ONE_WINNER',
      roundOneMatchups: formattedRoundOneMatchups,
      quarterFinalMatchups: formattedQuarterFinalMatchups,
    });
  };

  const allRounds = {
    2: {
      currentRound: allMatchups.quarterFinalMatchups,
      getNextMatchup: getSemiFinalMatchups,
      type: 'SET_QUARTER_FINAL_WINNER',
      currentRoundKey: 'quarterFinalMatchups',
      nextRoundKey: 'semiFinalMatchups',
    },
    3: {
      currentRound: allMatchups.semiFinalMatchups,
      getNextMatchup: getFinalMatchup,
      type: 'SET_SEMI_FINAL_WINNER',
      currentRoundKey: 'semiFinalMatchups',
      nextRoundKey: 'finalsMatchup',
    },
    4: {
      currentRound: allMatchups.finalsMatchup,
      getNextMatchup: getWinner,
      type: 'SET_WINNER',
      currentRoundKey: 'finalsMatchup',
      nextRoundKey: 'winner',
    },
  };

  const setWinner = player => {
    const { matchupId, round } = player;
    const {
      currentRound,
      getNextMatchup,
      type,
      currentRoundKey,
      nextRoundKey,
    } = allRounds[round];

    // Transform latest data from array to object so that we can map to specific matchup
    const currentRoundMatchupsAsObject =
      transformMatchupsArrayToObject(currentRound);

    // Get current matchup and set winner
    const currentMatchup = currentRoundMatchupsAsObject[matchupId];
    currentMatchup.winner = player;

    // Get next round matchups using updated matchups with winner selections and format back to array
    const nextMatchup = getNextMatchup(currentRoundMatchupsAsObject);

    // Format current and next round back to array
    const formattedCurrentRoundMatchups = transformMatchupsObjectIntoArray(
      currentRoundMatchupsAsObject
    );
    const formattedNextRoundMatchups =
      transformMatchupsObjectIntoArray(nextMatchup);

    // To fix bug of certain picks being removed, everytime a slection is made, we should update every round, rather than just the current and next rounds

    dispatch({
      type,
      [currentRoundKey]: formattedCurrentRoundMatchups,
      [nextRoundKey]: formattedNextRoundMatchups,
    });
  };

  return {
    allMatchups,
    setRoundOneWinner,
    setWinner,
  };
}
