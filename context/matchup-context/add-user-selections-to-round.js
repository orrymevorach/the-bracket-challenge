import { addWinnerToMatchups } from '@/context/matchup-context/matchup-utils';
import { getBracket } from '@/lib/airtable';
import { ROUND_SUFFIXES } from '@/utils/constants';
import { camelToSnakeCase } from '@/utils/utils';

export const sortBracketByRound = ({ bracket }) => {
  let Duels = {};
  let DuelsWomen = {};
  let Revelstoke = {};
  let RevelstokeWomen = {};
  let Selkirk = {};
  let SelkirkWomen = {};

  for (const key in bracket) {
    const selectedWinner = bracket[key];
    const keyInSnakeCase = camelToSnakeCase(key);

    if (keyInSnakeCase.includes(ROUND_SUFFIXES.Duels)) {
      const matchupId = keyInSnakeCase.replace(ROUND_SUFFIXES.Duels, '');
      Duels[matchupId] = selectedWinner;
    }
    if (keyInSnakeCase.includes(ROUND_SUFFIXES.DuelsWomen)) {
      const matchupId = keyInSnakeCase.replace(ROUND_SUFFIXES.DuelsWomen, '');
      DuelsWomen[matchupId] = selectedWinner;
    }
    if (keyInSnakeCase.includes(ROUND_SUFFIXES.Revelstoke)) {
      const matchupId = keyInSnakeCase.replace(ROUND_SUFFIXES.Revelstoke, '');
      Revelstoke[matchupId] = selectedWinner;
    }
    if (keyInSnakeCase.includes(ROUND_SUFFIXES.RevelstokeWomen)) {
      const matchupId = keyInSnakeCase.replace(
        ROUND_SUFFIXES.RevelstokeWomen,
        ''
      );
      RevelstokeWomen[matchupId] = selectedWinner;
    }
    if (keyInSnakeCase.includes(ROUND_SUFFIXES.Selkirk)) {
      const matchupId = keyInSnakeCase.replace(ROUND_SUFFIXES.Selkirk, '');
      Selkirk[matchupId] = selectedWinner;
    }
    if (keyInSnakeCase.includes(ROUND_SUFFIXES.SelkirkWomen)) {
      const matchupId = keyInSnakeCase.replace(ROUND_SUFFIXES.SelkirkWomen, '');
      SelkirkWomen[matchupId] = selectedWinner;
    }
  }
  return {
    Duels,
    DuelsWomen,
    Revelstoke,
    RevelstokeWomen,
    Selkirk,
    SelkirkWomen,
  };
};

export default async function addUserSelectionsToRounds({
  matchups,
  bracketId,
}) {
  const data = await getBracket({ recId: bracketId });
  const bracketSortedByRound = sortBracketByRound({
    bracket: data,
  });

  const sortedBracketAsArray = Object.entries(bracketSortedByRound);

  return sortedBracketAsArray.reduce((acc, userBracketSelections) => {
    const [roundName, roundSelections] = userBracketSelections;

    const selectionsArray = Object.entries(roundSelections);
    let updatedMatchups = [];
    for (let matchup of selectionsArray) {
      const matchupId = matchup[0];
      const player = matchup[1][0];
      updatedMatchups = addWinnerToMatchups({
        player,
        matchups: matchups[roundName],
        matchupId,
      });
    }
    acc[roundName] = updatedMatchups;
    return acc;
  }, {});
}
