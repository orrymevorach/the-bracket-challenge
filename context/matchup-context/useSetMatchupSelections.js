import { useReducer } from 'react';
import {
  getQuarterFinalMatchups,
  getSemiFinalMatchups,
  getFinalMatchup,
  getWinner,
} from './matchups';
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
        winner: action.winner,
        hasSetRoundOneMatchups: true,
      };
    case 'SET_SAVED_SELECTIONS':
      return {
        ...state,
        roundOneMatchups: action.roundOneMatchups,
        quarterFinalMatchups: action.quarterFinalMatchups,
        semiFinalMatchups: action.semiFinalMatchups,
        finalsMatchup: action.finalsMatchup,
        winner: action.winner,
        hasSetUserSelections: true,
      };
    // case 'SET_SAVED_SELECTIONS':
    //   return {
    //     ...state,
    //     roundOneMatchups: action.roundOneMatchups,
    //     quarterFinalMatchups: action.quarterFinalMatchups,
    //     semiFinalMatchups: action.semiFinalMatchups,
    //     finalsMatchup: action.finalsMatchup,
    //     winner: action.winner,
    //     hasCorrectWinners: true,
    //   };
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
  hasSetRoundOneMatchups: false,
  hasSetUserSelections: false,
  hasCorrectWinners: false,
};

export default function useSetMatchupSelections() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const allRounds = {
    1: {
      currentRoundMatchups: state.roundOneMatchups,
      nextRoundMatchups: state.quarterFinalMatchups,
      getNextRoundMatchups: getQuarterFinalMatchups,
      currentRoundKey: 'roundOneMatchups',
      nextRoundKey: 'quarterFinalMatchups',
      type: 'SET_ROUND_ONE_WINNER',
    },
    2: {
      currentRoundMatchups: state.quarterFinalMatchups,
      nextRoundMatchups: state.semiFinalMatchups,
      getNextRoundMatchups: getSemiFinalMatchups,
      currentRoundKey: 'quarterFinalMatchups',
      nextRoundKey: 'semiFinalMatchups',
      type: 'SET_QUARTER_FINAL_WINNER',
    },
    3: {
      currentRoundMatchups: state.semiFinalMatchups,
      nextRoundMatchups: state.finalsMatchup,
      getNextRoundMatchups: getFinalMatchup,
      currentRoundKey: 'semiFinalMatchups',
      nextRoundKey: 'finalsMatchup',
      type: 'SET_SEMI_FINAL_WINNER',
    },
    4: {
      currentRoundMatchups: state.finalsMatchup,
      nextRoundMatchups: state.winner,
      getNextRoundMatchups: getWinner,
      currentRoundKey: 'finalsMatchup',
      nextRoundKey: 'winner',
      type: 'SET_WINNER',
    },
  };
  const setWinner = ({ player, matchupId }) => {
    const { round } = player;
    const {
      currentRoundMatchups,
      nextRoundMatchups,
      currentRoundKey,
      nextRoundKey,
      type,
      getNextRoundMatchups,
    } = allRounds[round];

    const currentRoundMatchupsAsObject =
      transformMatchupsArrayToObject(currentRoundMatchups);

    const currentMatchup = currentRoundMatchupsAsObject[matchupId];
    currentMatchup.winner = player;

    const nextRound = getNextRoundMatchups({
      existingSelectionsInPreviousRound: currentRoundMatchupsAsObject,
      existingSelectionsInCurrentRound: nextRoundMatchups,
    });

    const formattedCurrentRoundMatchups = transformMatchupsObjectIntoArray(
      currentRoundMatchupsAsObject
    );
    const formattedNextRoundMatchups =
      transformMatchupsObjectIntoArray(nextRound);

    dispatch({
      type,
      [currentRoundKey]: formattedCurrentRoundMatchups,
      [nextRoundKey]: formattedNextRoundMatchups,
    });
  };

  const {
    roundOneMatchups,
    quarterFinalMatchups,
    semiFinalMatchups,
    finalsMatchup,
    winner,
    hasSetRoundOneMatchups,
    hasSetUserSelections,
    hasCorrectWinners,
  } = state;
  return {
    revelstokeMatchups: {
      roundOneMatchups,
      quarterFinalMatchups,
      semiFinalMatchups,
      finalsMatchup,
      winner,
    },
    setWinner,
    dispatch,
    hasSetRoundOneMatchups,
    hasSetUserSelections,
    hasCorrectWinners,
  };
}
