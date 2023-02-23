import { useEffect, useReducer } from 'react';
import { getSnowboarders } from '../../airtable-utils';
import { roundOneMatchups, testingRoundTwoMatchups } from './matchups';
import { useUser } from 'context/user-context/user-context';

const formatMatchups = data => {
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

const setRoundOneMatchups = ({ snowboarders = [] }) => {
  for (let i = 0; i < snowboarders.length; i++) {
    const currentSnowboarder = snowboarders[i];
    const currentSnowboardersRoundOneMatchupId =
      currentSnowboarder.matchupId.split('_P')[0];
    const currentRound = roundOneMatchups[currentSnowboardersRoundOneMatchupId];
    currentRound.snowboarders.push(currentSnowboarder);
  }
  const formattedRoundOneMatchups = formatMatchups(roundOneMatchups);
  return formattedRoundOneMatchups;
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

    const runUseEffect = async () => {
      if (userTeam) {
        await updateRoundOnematchups();
      }
    };
    runUseEffect();
    () => runUseEffect();
  }, [userTeam]);

  return {
    allMatchups,
    setWinner: player => {
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
    },
  };
}
