import { useReducer } from 'react';
import {
  roundOneMatchups,
  getQuarterFinalMatchups,
  getSemiFinalMatchups,
} from './matchups';
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
    case 'SET_ROUND_TWO_WINNER':
      return {
        ...state,
        quarterFinalMatchups: action.quarterFinalMatchups,
        semiFinalMatchups: action.semiFinalMatchups,
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

    // Get quarter final data using round one data
    const quarterFinalMatchups = getQuarterFinalMatchups(roundOneMatchups);

    // Format both rounds
    const formattedRoundOneMatchups = formatMatchups(roundOneMatchups);
    const formattedQuarterFinalMatchups = formatMatchups(quarterFinalMatchups);

    dispatch({
      type: 'SET_ROUND_WINNER',
      roundOneMatchups: formattedRoundOneMatchups,
      quarterFinalMatchups: formattedQuarterFinalMatchups,
    });
  };

  const transformMatchupsArrayToObject = data => {
    return data.reduce((acc, curr) => {
      const matchup = {
        snowboarders: curr.snowboarders,
        winner: curr.winner,
      };
      acc[curr.matchupId] = matchup;
      return acc;
    }, {});
  };

  const setQuarterFinalWinners = player => {
    const { matchupId } = player;

    // Get latest data from state
    const latestQuarterFinalData = allMatchups.quarterFinalMatchups;

    // Transform latest data from array to object so that we can map to specific matchup
    const quarterFinalMatchupsObject = transformMatchupsArrayToObject(
      latestQuarterFinalData
    );

    // Get current round and set winner
    const currentRound = quarterFinalMatchupsObject[matchupId];
    currentRound.winner = player;

    // Get semi finals matchups using updated quarter finals data
    const semiFinalMatchups = getSemiFinalMatchups(quarterFinalMatchupsObject);

    // // Format both rounds
    const formattedQuarterFinalMatchups = formatMatchups(
      quarterFinalMatchupsObject
    );
    const formattedSemiFinalMatchups = formatMatchups(semiFinalMatchups);

    dispatch({
      type: 'SET_ROUND_TWO_WINNER',
      quarterFinalMatchups: formattedQuarterFinalMatchups,
      semiFinalMatchups: formattedSemiFinalMatchups,
    });
  };

  return {
    allMatchups,
    setWinner,
    setQuarterFinalWinners,
  };
}
