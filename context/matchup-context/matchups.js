export const getRoundOneMatchups = () => ({
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
    R2_M1: {
      snowboarders: [
        existingSelectionsInPreviousRound['R1_M1']?.winner,
        existingSelectionsInPreviousRound['R1_M2']?.winner,
      ],
      winner: matchupOneWinner.winner,
    },
    R2_M2: {
      snowboarders: [
        existingSelectionsInPreviousRound['R1_M3']?.winner,
        existingSelectionsInPreviousRound['R1_M4']?.winner,
      ],
      winner: matchupTwoWinner.winner,
    },
    R2_M3: {
      snowboarders: [
        existingSelectionsInPreviousRound['R1_M5']?.winner,
        existingSelectionsInPreviousRound['R1_M6']?.winner,
      ],
      winner: matchupThreeWinner.winner,
    },
    R2_M4: {
      snowboarders: [
        existingSelectionsInPreviousRound['R1_M7']?.winner,
        existingSelectionsInPreviousRound['R1_M8']?.winner,
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
    R3_M1: {
      snowboarders: [
        existingSelectionsInPreviousRound['R2_M1']?.winner,
        existingSelectionsInPreviousRound['R2_M2']?.winner,
      ],
      winner: matchupOneWinner.winner,
    },
    R3_M2: {
      snowboarders: [
        existingSelectionsInPreviousRound['R2_M3']?.winner,
        existingSelectionsInPreviousRound['R2_M4']?.winner,
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
    R4_M1: {
      snowboarders: [
        existingSelectionsInPreviousRound['R3_M1']?.winner,
        existingSelectionsInPreviousRound['R3_M2']?.winner,
      ],
      winner: finalsSelection.winner,
    },
  };
};

export const getWinner = ({
  existingSelectionsInPreviousRound = getFinalMatchup({}),
}) => {
  return {
    R5_M1: {
      snowboarders: [existingSelectionsInPreviousRound['R4_M1']?.winner],
    },
  };
};
