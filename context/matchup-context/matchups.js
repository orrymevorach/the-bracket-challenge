export const roundOneMatchups = {
  R1_M1: {
    nextRound: 'R2_M1',
    snowboarders: [],
    winner: {},
  },
  R1_M2: {
    nextRound: 'R2_M1',
    snowboarders: [],
    winner: {},
  },
  R1_M3: {
    nextRound: 'R2_M2',
    snowboarders: [],
    winner: {},
  },
  R1_M4: {
    nextRound: 'R2_M2',
    snowboarders: [],
    winner: {},
  },
  R1_M5: {
    nextRound: 'R2_M3',
    snowboarders: [],
    winner: {},
  },
  R1_M6: {
    nextRound: 'R2_M3',
    snowboarders: [],
    winner: {},
  },
  R1_M7: {
    nextRound: 'R2_M4',
    snowboarders: [],
    winner: {},
  },
  R1_M8: {
    nextRound: 'R2_M4',
    snowboarders: [],
    winner: {},
  },
};

export const getQuarterFinalMatchups = (updatedRoundOne = roundOneMatchups) => {
  return {
    R2_M1: {
      snowboarders: [
        updatedRoundOne['R1_M1']?.winner,
        updatedRoundOne['R1_M2']?.winner,
      ],
      winner: {},
    },
    R2_M2: {
      snowboarders: [
        updatedRoundOne['R1_M3']?.winner,
        updatedRoundOne['R1_M4']?.winner,
      ],
      winner: {},
    },
    R2_M3: {
      snowboarders: [
        updatedRoundOne['R1_M5']?.winner,
        updatedRoundOne['R1_M6']?.winner,
      ],
      winner: {},
    },
    R2_M4: {
      snowboarders: [
        updatedRoundOne['R1_M7']?.winner,
        updatedRoundOne['R1_M8']?.winner,
      ],
      winner: {},
    },
  };
};

export const getSemiFinalMatchups = (
  updatedRoundTwo = getQuarterFinalMatchups()
) => {
  return {
    R3_M1: {
      snowboarders: [
        updatedRoundTwo['R2_M1']?.winner,
        updatedRoundTwo['R2_M2']?.winner,
      ],
      winner: {},
    },
    R3_M2: {
      snowboarders: [
        updatedRoundTwo['R2_M3']?.winner,
        updatedRoundTwo['R2_M4']?.winner,
      ],
      winner: {},
    },
  };
};

export const getFinalMatchup = (updatedSemiFinal = getSemiFinalMatchups()) => {
  return {
    R4_M1: {
      snowboarders: [
        updatedSemiFinal['R3_M1']?.winner,
        updatedSemiFinal['R3_M2']?.winner,
      ],
      winner: {},
    },
  };
};

export const getWinner = updatedFinal => {
  return {
    R5_M1: {
      snowboarders: [updatedFinal['R4_M1']?.winner],
      winner: {},
    },
  };
};
