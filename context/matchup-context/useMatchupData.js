import { useReducer } from 'react';
import { roundOneMatchups, testingRoundTwoMatchups } from './matchups';
import { useSetInitialMatchups } from './useSetInitialMatchups';

export const formatMatchups = data => {
  const dataIntoArray = Object.entries(data);
  return dataIntoArray.map(matchup => {
    const [matchupId, { snowboarders, winner }] = matchup;
    return {
      matchupId,
      snowboarders,
      winner,
    };
  });
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROUND_ONE_MATCHUPS':
      return {
        ...state,
        roundOneMatchups: action.roundOneMatchups,
        isRoundOneLoading: action.isLoading,
      };
    case 'SET_ROUND_WINNER':
      return {
        ...state,
        roundOneMatchups: action.roundOneMatchups,
        quarterFinalMatchups: action.quarterFinalMatchups,
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

export default function useMatchupData() {
  const [allMatchups, dispatch] = useReducer(reducer, initialState);

  useSetInitialMatchups({ dispatch });

  const setWinner = player => {
    const { matchupId } = player;
    // Setting winner of current round
    const currentRound = roundOneMatchups[matchupId];
    currentRound.winner = player;

    // Send updated selections to round two data
    const updatedRoundTwo = testingRoundTwoMatchups(roundOneMatchups);

    // Format both rounds
    const formattedRoundOneMatchups = formatMatchups(roundOneMatchups);
    const quarterFinalMatchups = formatMatchups(updatedRoundTwo);

    dispatch({
      type: 'SET_ROUND_WINNER',
      quarterFinalMatchups,
      roundOneMatchups: formattedRoundOneMatchups,
    });
  };

  return {
    allMatchups,
    setWinner,
  };
}
