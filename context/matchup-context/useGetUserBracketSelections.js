import { getBracket } from '@/lib/airtable';
import { ROUND_SUFFIXES } from '@/utils/constants';
import { camelToSnakeCase } from '@/utils/utils';
import { useEffect, useState } from 'react';

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

const useGetBracket = ({ recId }) => {
  const [bracketData, setBracketData] = useState(null);
  useEffect(() => {
    const getBracketData = async () => {
      const data = await getBracket({ recId });
      setBracketData(data);
    };
    getBracketData();
  }, [recId]);
  return bracketData;
};

export default function useGetUserBracketSelections({ recId }) {
  const bracketSelections = useGetBracket({ recId });
  const bracketSortedByRound = sortBracketByRound({
    bracket: bracketSelections,
  });
  return bracketSortedByRound;
}
