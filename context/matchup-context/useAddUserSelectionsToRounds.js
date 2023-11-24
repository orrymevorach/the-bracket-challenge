import { useEffect, useState } from 'react';
import { addWinnerToMatchups } from './matchup-utils';

export default function useAddUserSelectionsToRounds({
  matchups,
  setMatchups,
  userBracketSelections,
}) {
  const [hasData, setHasData] = useState(false);
  useEffect(() => {
    const hasSelections =
      userBracketSelections.R1_M1 &&
      userBracketSelections.R1_M1.length &&
      userBracketSelections.R1_M1[0].id;
    if (matchups.length && hasSelections && !hasData) {
      const selectionsArray = Object.entries(userBracketSelections);

      let updatedMatchups = [];
      for (let matchup of selectionsArray) {
        const matchupId = matchup[0];
        const player = matchup[1][0];
        updatedMatchups = addWinnerToMatchups({
          player,
          matchups,
          matchupId,
        });
      }
      setMatchups(updatedMatchups);
      setHasData(true);
    }
  }, [userBracketSelections, matchups, setMatchups, hasData]);
}
