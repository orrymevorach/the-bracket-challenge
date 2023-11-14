import { getSnowboarders } from '@/lib/airtable';
import { ROUND_SUFFIXES } from '@/utils/constants';
import { useEffect, useState } from 'react';

const sortSnowboardersByRound = ({ snowboarders }) => {
  let Duels = [];
  let DuelsWomen = [];
  let Revelstoke = [];
  let RevelstokeWomen = [];
  let Selkirk = [];
  let SelkirkWomen = [];

  for (let snowboarder of snowboarders) {
    if (
      snowboarder.duelsMatchupId &&
      snowboarder.duelsMatchupId.includes(ROUND_SUFFIXES.Duels)
    ) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.duelsMatchupId.replace(
        ROUND_SUFFIXES.Duels,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      Duels.push(snowboarderCopy);
    }
    if (
      snowboarder.duelsMatchupId &&
      snowboarder.duelsMatchupId.includes(ROUND_SUFFIXES.DuelsWomen)
    ) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.duelsMatchupId.replace(
        ROUND_SUFFIXES.DuelsWomen,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      DuelsWomen.push(snowboarderCopy);
    }
    if (
      snowboarder.revelstokeMatchupId &&
      snowboarder.revelstokeMatchupId.includes(ROUND_SUFFIXES.Revelstoke)
    ) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.revelstokeMatchupId.replace(
        ROUND_SUFFIXES.Revelstoke,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      Revelstoke.push(snowboarderCopy);
    }
    if (
      snowboarder.revelstokeMatchupId &&
      snowboarder.revelstokeMatchupId.includes(ROUND_SUFFIXES.RevelstokeWomen)
    ) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.revelstokeMatchupId.replace(
        ROUND_SUFFIXES.RevelstokeWomen,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      RevelstokeWomen.push(snowboarderCopy);
    }
    if (
      snowboarder.selkirkMatchupId &&
      snowboarder.selkirkMatchupId.includes(ROUND_SUFFIXES.Selkirk)
    ) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.selkirkMatchupId.replace(
        ROUND_SUFFIXES.Selkirk,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      Selkirk.push(snowboarderCopy);
    }
    if (
      snowboarder.selkirkMatchupId &&
      snowboarder.selkirkMatchupId.includes(ROUND_SUFFIXES.SelkirkWomen)
    ) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.selkirkMatchupId.replace(
        ROUND_SUFFIXES.SelkirkWomen,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      SelkirkWomen.push(snowboarderCopy);
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

export default function useGetSnowboarders() {
  const [snowboarders, setSnowboarders] = useState([]);
  useEffect(() => {
    const getSnowboardersData = async () => {
      const data = await getSnowboarders();
      const snowboardersSortedByRound = sortSnowboardersByRound({
        snowboarders: data.snowboarders,
      });
      setSnowboarders(snowboardersSortedByRound);
    };
    getSnowboardersData();
  }, []);
  return snowboarders;
}
