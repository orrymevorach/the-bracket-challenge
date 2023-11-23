import { useReducer } from 'react';
import {
  getRoundTwoMatchups,
  getRoundThreeMatchups,
  getRoundFourMatchup,
  getWinner,
} from './roundProgressions';
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
        roundTwoMatchups: action.roundTwoMatchups,
        roundThreeMatchups: action.roundThreeMatchups,
        roundFourMatchup: action.roundFourMatchup,
        winner: action.winner,
        hasSetRoundOneMatchups: true,
      };
    case 'SET_SAVED_SELECTIONS':
      return {
        ...state,
        roundOneMatchups: action.roundOneMatchups,
        roundTwoMatchups: action.roundTwoMatchups,
        roundThreeMatchups: action.roundThreeMatchups,
        roundFourMatchup: action.roundFourMatchup,
        winner: action.winner,
        hasSetUserSelections: true,
      };
    // case 'SET_SAVED_SELECTIONS':
    //   return {
    //     ...state,
    //     roundOneMatchups: action.roundOneMatchups,
    //     roundTwoMatchups: action.roundTwoMatchups,
    //     roundThreeMatchups: action.roundThreeMatchups,
    //     roundFourMatchup: action.roundFourMatchup,
    //     winner: action.winner,
    //     hasCorrectWinners: true,
    //   };
    case 'SET_ROUND_ONE_WINNER':
      return {
        ...state,
        roundOneMatchups: action.roundOneMatchups,
        roundTwoMatchups: action.roundTwoMatchups,
      };
    case 'SET_QUARTER_FINAL_WINNER':
      return {
        ...state,
        roundTwoMatchups: action.roundTwoMatchups,
        roundThreeMatchups: action.roundThreeMatchups,
      };
    case 'SET_SEMI_FINAL_WINNER':
      return {
        ...state,
        roundThreeMatchups: action.roundThreeMatchups,
        roundFourMatchup: action.roundFourMatchup,
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
  roundTwoMatchups: [],
  roundThreeMatchups: [],
  roundFourMatchup: [],
  winner: [],
  hasSetRoundOneMatchups: false,
  hasSetUserSelections: false,
  hasCorrectWinners: false,
};

export default function useSetRoundProgressions() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const allRounds = {
    1: {
      currentRoundMatchups: state.roundOneMatchups,
      nextRoundMatchups: state.roundTwoMatchups,
      getNextRoundMatchups: getRoundTwoMatchups,
      currentRoundKey: 'roundOneMatchups',
      nextRoundKey: 'roundTwoMatchups',
      type: 'SET_ROUND_ONE_WINNER',
    },
    2: {
      currentRoundMatchups: state.roundTwoMatchups,
      nextRoundMatchups: state.roundThreeMatchups,
      getNextRoundMatchups: getRoundThreeMatchups,
      currentRoundKey: 'roundTwoMatchups',
      nextRoundKey: 'roundThreeMatchups',
      type: 'SET_QUARTER_FINAL_WINNER',
    },
    3: {
      currentRoundMatchups: state.roundThreeMatchups,
      nextRoundMatchups: state.roundFourMatchup,
      getNextRoundMatchups: getRoundFourMatchup,
      currentRoundKey: 'roundThreeMatchups',
      nextRoundKey: 'roundFourMatchup',
      type: 'SET_SEMI_FINAL_WINNER',
    },
    4: {
      currentRoundMatchups: state.roundFourMatchup,
      nextRoundMatchups: state.winner,
      getNextRoundMatchups: getWinner,
      currentRoundKey: 'roundFourMatchup',
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
    roundTwoMatchups,
    roundThreeMatchups,
    roundFourMatchup,
    winner,
    hasSetRoundOneMatchups,
    hasSetUserSelections,
    hasCorrectWinners,
  } = state;
  return {
    matchups: {
      roundOneMatchups,
      roundTwoMatchups,
      roundThreeMatchups,
      roundFourMatchup,
      winner,
    },
    setWinner,
    dispatch,
    hasSetRoundOneMatchups,
    hasSetUserSelections,
    hasCorrectWinners,
  };
}
