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

export const testingRoundTwoMatchups = updatedRoundOne => {
  return {
    R2_M1: {
      snowboarders: [
        updatedRoundOne['R1_M1'].winner,
        updatedRoundOne['R1_M2'].winner,
      ],
      nextRound: 'R3_M1',
      winner: {},
    },
    R2_M2: {
      snowboarders: [
        updatedRoundOne['R1_M3'].winner,
        updatedRoundOne['R1_M4'].winner,
      ],
      nextRound: 'R3_M1',
      winner: {},
    },
    R2_M3: {
      snowboarders: [
        updatedRoundOne['R1_M5'].winner,
        updatedRoundOne['R1_M6'].winner,
      ],
      nextRound: 'R3_M2',
      winner: {},
    },
    R2_M4: {
      snowboarders: [
        updatedRoundOne['R1_M7'].winner,
        updatedRoundOne['R1_M8'].winner,
      ],
      nextRound: 'R3_M2',
      winner: {},
    },
  };
};

// export const testingRoundThreeMatchups = updatedRoundOne => {
//   return {
//     R2_M1: {
//       snowboarders: [
//         updatedRoundOne['R1_M1'].winner,
//         updatedRoundOne['R1_M2'].winner,
//       ],
//       nextRound: 'R3_M1',
//       winner: {},
//     },
//     R2_M2: {
//       snowboarders: [
//         updatedRoundOne['R1_M3'].winner,
//         updatedRoundOne['R1_M4'].winner,
//       ],
//       nextRound: 'R3_M1',
//       winner: {},
//     },
//     R2_M3: {
//       snowboarders: [
//         updatedRoundOne['R1_M5'].winner,
//         updatedRoundOne['R1_M6'].winner,
//       ],
//       nextRound: 'R3_M2',
//       winner: {},
//     },
//     R2_M4: {
//       snowboarders: [
//         updatedRoundOne['R1_M7'].winner,
//         updatedRoundOne['R1_M8'].winner,
//       ],
//       nextRound: 'R3_M2',
//       winner: {},
//     },
//   };
// };
