import { useEffect } from 'react';
import {
  transformMatchupsArrayToObject,
  transformMatchupsObjectIntoArray,
} from './matchup-utils';
import {
  getRoundTwoMatchups,
  getRoundThreeMatchups,
  getRoundFourMatchup,
  getWinner,
} from './roundProgressions';
import { isEmpty } from '@/utils/utils';

const addSavedSelectionsToRoundData = ({ bracketData = {} }) => {
  const initMatchups = {
    roundOneMatchups: [],
    roundTwoMatchups: [],
    roundThreeMatchups: [],
    roundFourMatchup: [],
    winner: [],
  };

  const mapMatchupIdToRound = {
    R1: initMatchups.roundOneMatchups,
    R2: initMatchups.roundTwoMatchups,
    R3: initMatchups.roundThreeMatchups,
    R4: initMatchups.roundFourMatchup,
    R5: initMatchups.winner,
  };

  const bracketAsArray = Object.entries(bracketData);
  for (let matchup of bracketAsArray) {
    const [matchupId, winner] = matchup;
    const round = matchupId.split('_M')[0];
    const roundArray = mapMatchupIdToRound[round];

    const matchupData = {
      matchupId,
      winner: winner[0],
      snowboarders: [],
    };
    roundArray.push(matchupData);
  }

  return initMatchups;
};

const matchSnowboardersWithSelections = ({ roundSelections, roundState }) => {
  for (let i = 0; i < roundState.length; i++) {
    const matchup = roundState[i];
    const currentRoundFromSelections = roundSelections.find(
      round => round.matchupId === matchup.matchupId
    );
    if (currentRoundFromSelections) {
      currentRoundFromSelections.snowboarders = matchup.snowboarders;
    }
  }
  return roundSelections;
};

const addSnowboardersToRoundData = ({ selections, state }) => {
  const roundOneMatchups = matchSnowboardersWithSelections({
    roundSelections: selections.roundOneMatchups,
    roundState: state.roundOneMatchups,
  });

  const roundTwoMatchups = getRoundTwoMatchups({
    existingSelectionsInPreviousRound:
      transformMatchupsArrayToObject(roundOneMatchups),
    existingSelectionsInCurrentRound: selections.roundTwoMatchups,
  });

  const roundThreeMatchups = getRoundThreeMatchups({
    existingSelectionsInPreviousRound: roundTwoMatchups,
    existingSelectionsInCurrentRound: selections.roundThreeMatchups,
  });
  const roundFourMatchup = getRoundFourMatchup({
    existingSelectionsInPreviousRound: roundThreeMatchups,
    existingSelectionsInCurrentRound: selections.roundFourMatchup,
  });
  const winner = getWinner({
    existingSelectionsInPreviousRound: roundFourMatchup,
    existingSelectionsInCurrentRound: selections.winner,
  });

  const formattedRoundTwoMatchups =
    transformMatchupsObjectIntoArray(roundTwoMatchups);
  const formattedRoundThreeMatchups =
    transformMatchupsObjectIntoArray(roundThreeMatchups);
  const formattedRoundFourMatchups =
    transformMatchupsObjectIntoArray(roundFourMatchup);
  const formattedWinner = transformMatchupsObjectIntoArray(winner);

  return {
    roundOneMatchups,
    roundTwoMatchups: formattedRoundTwoMatchups,
    roundThreeMatchups: formattedRoundThreeMatchups,
    roundFourMatchup: formattedRoundFourMatchups,
    winner: formattedWinner,
  };
};

export default function useAddUserSelectionsToRounds({
  matchupData,
  userBracketSelections,
}) {
  useEffect(() => {
    const { dispatch, hasSetRoundOneMatchups, hasSetUserSelections } =
      matchupData;
    const hasData =
      !isEmpty(userBracketSelections) &&
      userBracketSelections.R1_M1?.length > 0;
    if (hasData && hasSetRoundOneMatchups && !hasSetUserSelections) {
      const allMatchupWithSelections = addSavedSelectionsToRoundData({
        bracketData: userBracketSelections,
      });
      const allRounds = addSnowboardersToRoundData({
        selections: allMatchupWithSelections,
        state: matchupData.matchups,
      });
      dispatch({
        type: 'SET_SAVED_SELECTIONS',
        ...allRounds,
      });
    }
  }, [matchupData, userBracketSelections]);
}
