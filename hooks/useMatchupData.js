import { useEffect, useReducer } from 'react';
import { getSnowboarders, getUserTeam } from '../airtable-utils';
import { removeDupes } from 'utils/utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROUND_ONE_MATCHUPS':
      return {
        roundOneMatchups: action.roundOneMatchups,
      };
    case 'SET_ROUND_TWO_MATCHUPS':
      return {
        ...state,
        roundTwoMatchups: action.roundTwoMatchups,
      };
    default:
      return state;
  }
};

const init = {
  roundOneMatchups: [],
  roundTwoMatchups: [],
};

const roundOne = [
  {
    id: 'R1_M1',
    acceptedRoundOneIds: ['R1_M1_P1', 'R1_M1_P2'],
    snowboarders: [],
  },
  {
    id: 'R1_M2',
    acceptedRoundOneIds: ['R1_M2_P1', 'R1_M2_P2'],
    snowboarders: [],
  },
  {
    id: 'R1_M3',
    acceptedRoundOneIds: ['R1_M3_P1', 'R1_M3_P2'],
    snowboarders: [],
  },
  {
    id: 'R1_M4',
    acceptedRoundOneIds: ['R1_M4_P1', 'R1_M4_P2'],
    snowboarders: [],
  },
  {
    id: 'R1_M5',
    acceptedRoundOneIds: ['R1_M5_P1', 'R1_M5_P2'],
    snowboarders: [],
  },
  {
    id: 'R1_M6',
    acceptedRoundOneIds: ['R1_M6_P1', 'R1_M6_P2'],
    snowboarders: [],
  },
  {
    id: 'R1_M7',
    acceptedRoundOneIds: ['R1_M7_P1', 'R1_M7_P2'],
    snowboarders: [],
  },
  {
    id: 'R1_M8',
    acceptedRoundOneIds: ['R1_M8_P1', 'R1_M8_P2'],
    snowboarders: [],
  },
];

const roundTwo = [
  {
    id: 'R2_M1',
    acceptedRoundOneIds: ['R1_M1', 'R1_M2'],
    snowboarders: [],
  },
  {
    id: 'R2_M2',
    acceptedRoundOneIds: ['R1_M3', 'R1_M4'],
    snowboarders: [],
  },
  {
    id: 'R2_M3',
    acceptedRoundOneIds: ['R1_M5', 'R1_M6'],
    snowboarders: [],
  },
  {
    id: 'R2_M4',
    acceptedRoundOneIds: ['R1_M7', 'R1_M8'],
    snowboarders: [],
  },
];

const setRoundOneMatchups = ({ snowboarders }) => {
  return roundOne.map(currentRound => {
    for (let i = 0; i < snowboarders.length; i++) {
      const currentSnowboarder = snowboarders[i];
      if (
        currentRound.acceptedRoundOneIds.includes(currentSnowboarder.matchups)
      ) {
        currentRound.snowboarders.push(currentSnowboarder);
      }
    }
    currentRound.snowboarders = removeDupes(currentRound.snowboarders);
    return currentRound;
  });
};

const setRoundTwoMatchups = ({ roundOneWinners = [] }) => {
  return roundTwo.map(currentRound => {
    for (let i = 0; i < roundOneWinners.length; i++) {
      const rider = roundOneWinners[i];
      console.log('currentRound', currentRound);
      if (
        currentRound.acceptedRoundOneIds.includes(rider.matchups.split('_P')[0])
      ) {
        currentRound.snowboarders.push(rider);
      }
    }
    currentRound.snowboarders = removeDupes(currentRound.snowboarders);
    return currentRound;
  });
};

export default function useMatchupData() {
  const [matchups, dispatch] = useReducer(reducer, init);
  useEffect(() => {
    const updateMatchups = async () => {
      const snowboarders = await getSnowboarders();
      const roundOneMatchups = setRoundOneMatchups(snowboarders);
      await dispatch({
        type: 'SET_ROUND_ONE_MATCHUPS',
        roundOneMatchups,
      });
    };
    const updateRoundTwo = async () => {
      const res = await getUserTeam({ name: 'Orry' });
      if (res.userTeam.round1Winners.length > 0) {
        const roundTwoMatchups = setRoundTwoMatchups({
          roundOneWinners: res.userTeam.round1Winners,
        });
        await dispatch({
          type: 'SET_ROUND_TWO_MATCHUPS',
          roundTwoMatchups,
        });
      }
    };
    const runUseEffect = async () => {
      await updateMatchups();
      await updateRoundTwo();
    };
    runUseEffect();
    () => runUseEffect();
  }, []);

  return matchups;
}
