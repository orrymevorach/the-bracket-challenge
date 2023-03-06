import { getBracket } from 'airtable-utils';
import { useState, useEffect } from 'react';
import {
  transformMatchupsArrayToObject,
  transformMatchupsObjectIntoArray,
} from './matchup-utils';
import {
  getQuarterFinalMatchups,
  getSemiFinalMatchups,
  getFinalMatchup,
  getWinner,
} from './matchups';

const useGetBracket = () => {
  const [bracketData, setBracketData] = useState(null);
  useEffect(() => {
    const getBracketData = async () => {
      const data = await getBracket({ memberId: '' });
      setBracketData(data);
    };
    getBracketData();
  }, []);
  return bracketData;
};

const addSavedSelectionsToRoundData = ({ bracketData = {} }) => {
  const initMatchups = {
    roundOneMatchups: [],
    semiFinalMatchups: [],
    quarterFinalMatchups: [],
    finalsMatchup: [],
    winner: [],
  };

  const mapMatchupIdToRound = {
    r1: initMatchups.roundOneMatchups,
    r2: initMatchups.quarterFinalMatchups,
    r3: initMatchups.semiFinalMatchups,
    r4: initMatchups.finalsMatchup,
    r5: initMatchups.winner,
  };

  const bracketAsArray = Object.entries(bracketData);
  for (let matchup of bracketAsArray) {
    const [matchupId, winnerAsArray] = matchup;
    const winner = winnerAsArray[0];
    const matchupIdWithoutPlayerId = matchupId.split('M')[0];
    const arrayToUpdate = mapMatchupIdToRound[matchupIdWithoutPlayerId];
    if (arrayToUpdate) {
      const data = {
        matchupId: matchupId.replace('M', '_M').replace('r', 'R'),
        winner,
        snowboarders: [],
      };
      arrayToUpdate.push(data);
    }
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

  const quarterFinalMatchups = getQuarterFinalMatchups({
    existingSelectionsInPreviousRound:
      transformMatchupsArrayToObject(roundOneMatchups),
    existingSelectionsInCurrentRound: selections.quarterFinalMatchups,
  });

  const semiFinalMatchups = getSemiFinalMatchups({
    existingSelectionsInPreviousRound: quarterFinalMatchups,
    existingSelectionsInCurrentRound: selections.semiFinalMatchups,
  });
  const finalsMatchup = getFinalMatchup({
    existingSelectionsInPreviousRound: semiFinalMatchups,
    existingSelectionsInCurrentRound: selections.finalsMatchup,
  });
  const winner = getWinner({
    existingSelectionsInPreviousRound: finalsMatchup,
    existingSelectionsInCurrentRound: selections.winner,
  });

  const formattedQuarterFinalMatchups =
    transformMatchupsObjectIntoArray(quarterFinalMatchups);
  const formattedSemiFinalMatchups =
    transformMatchupsObjectIntoArray(semiFinalMatchups);
  const formattedFinalMatchups =
    transformMatchupsObjectIntoArray(finalsMatchup);
  const formattedWinner = transformMatchupsObjectIntoArray(winner);

  return {
    roundOneMatchups,
    quarterFinalMatchups: formattedQuarterFinalMatchups,
    semiFinalMatchups: formattedSemiFinalMatchups,
    finalsMatchup: formattedFinalMatchups,
    winner: formattedWinner,
  };
};

export default function useGetSavedSelections({ matchupData }) {
  const bracketData = useGetBracket();
  useEffect(() => {
    const {
      allMatchups: { hasSetRoundOneMatchups, hasSetUserSelections },
      dispatch,
    } = matchupData;
    if (bracketData && hasSetRoundOneMatchups && !hasSetUserSelections) {
      const allMatchupWithSelections = addSavedSelectionsToRoundData({
        bracketData,
      });
      const allRounds = addSnowboardersToRoundData({
        selections: allMatchupWithSelections,
        state: matchupData.allMatchups,
      });
      dispatch({
        type: 'SET_SAVED_SELECTIONS',
        ...allRounds,
      });
    }
  }, [matchupData, bracketData]);
}
