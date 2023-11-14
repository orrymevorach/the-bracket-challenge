export const getRoundOneMatchups = () => ({
  R_R1_M1: {
    nextRound: 'R_R2_M1',
    snowboarders: [],
    winner: {},
  },
  R_R1_M2: {
    nextRound: 'R_R2_M1',
    snowboarders: [],
    winner: {},
  },
  R_R1_M3: {
    nextRound: 'R_R2_M2',
    snowboarders: [],
    winner: {},
  },
  R_R1_M4: {
    nextRound: 'R_R2_M2',
    snowboarders: [],
    winner: {},
  },
  R_R1_M5: {
    nextRound: 'R_R2_M3',
    snowboarders: [],
    winner: {},
  },
  R_R1_M6: {
    nextRound: 'R_R2_M3',
    snowboarders: [],
    winner: {},
  },
  R_R1_M7: {
    nextRound: 'R_R2_M4',
    snowboarders: [],
    winner: {},
  },
  R_R1_M8: {
    nextRound: 'R_R2_M4',
    snowboarders: [],
    winner: {},
  },
});

export const getQuarterFinalMatchups = ({
  existingSelectionsInPreviousRound = getRoundOneMatchups(),
  existingSelectionsInCurrentRound = [],
}) => {
  const [
    matchupOneWinner = {},
    matchupTwoWinner = {},
    matchupThreeWinner = {},
    matchupFourWinner = {},
  ] = existingSelectionsInCurrentRound;

  return {
    R_R2_M1: {
      snowboarders: [
        existingSelectionsInPreviousRound['R_R1_M1']?.winner,
        existingSelectionsInPreviousRound['R_R1_M2']?.winner,
      ],
      winner: matchupOneWinner.winner,
    },
    R_R2_M2: {
      snowboarders: [
        existingSelectionsInPreviousRound['R_R1_M3']?.winner,
        existingSelectionsInPreviousRound['R_R1_M4']?.winner,
      ],
      winner: matchupTwoWinner.winner,
    },
    R_R2_M3: {
      snowboarders: [
        existingSelectionsInPreviousRound['R_R1_M5']?.winner,
        existingSelectionsInPreviousRound['R_R1_M6']?.winner,
      ],
      winner: matchupThreeWinner.winner,
    },
    R_R2_M4: {
      snowboarders: [
        existingSelectionsInPreviousRound['R_R1_M7']?.winner,
        existingSelectionsInPreviousRound['R_R1_M8']?.winner,
      ],
      winner: matchupFourWinner.winner,
    },
  };
};

export const getSemiFinalMatchups = ({
  existingSelectionsInPreviousRound = getQuarterFinalMatchups({}),
  existingSelectionsInCurrentRound = [],
}) => {
  const [matchupOneWinner = {}, matchupTwoWinner = {}] =
    existingSelectionsInCurrentRound;
  return {
    R_R3_M1: {
      snowboarders: [
        existingSelectionsInPreviousRound['R_R2_M1']?.winner,
        existingSelectionsInPreviousRound['R_R2_M2']?.winner,
      ],
      winner: matchupOneWinner.winner,
    },
    R_R3_M2: {
      snowboarders: [
        existingSelectionsInPreviousRound['R_R2_M3']?.winner,
        existingSelectionsInPreviousRound['R_R2_M4']?.winner,
      ],
      winner: matchupTwoWinner.winner,
    },
  };
};

export const getFinalMatchup = ({
  existingSelectionsInPreviousRound = getSemiFinalMatchups({}),
  existingSelectionsInCurrentRound = [],
}) => {
  const [finalsSelection = {}] = existingSelectionsInCurrentRound;
  return {
    R_R4_M1: {
      snowboarders: [
        existingSelectionsInPreviousRound['R_R3_M1']?.winner,
        existingSelectionsInPreviousRound['R_R3_M2']?.winner,
      ],
      winner: finalsSelection.winner,
    },
  };
};

export const getWinner = ({
  existingSelectionsInPreviousRound = getFinalMatchup({}),
}) => {
  return {
    R_R4_M1: {
      snowboarders: [existingSelectionsInPreviousRound['R_R4_M1']?.winner],
      winner: existingSelectionsInPreviousRound['R_R4_M1']?.winner,
    },
  };
};
