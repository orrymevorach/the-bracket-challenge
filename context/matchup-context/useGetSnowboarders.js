import { getSnowboarders } from '@/lib/airtable';
import { ROUND_SUFFIXES } from '@/utils/constants';
import { useEffect, useState } from 'react';

const sortSnowboardersByRound = ({ snowboarders }) => {
  let Duels = [];
  let Revelstoke = [];
  let Selkirk = [];

  for (let snowboarder of snowboarders) {
    if (snowboarder.duelsMatchupId) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.duelsMatchupId.replace(
        ROUND_SUFFIXES.Duels,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      Duels.push(snowboarderCopy);
    }
    if (snowboarder.revelstokeMatchupId) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.revelstokeMatchupId.replace(
        ROUND_SUFFIXES.Revelstoke,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      Revelstoke.push(snowboarderCopy);
    }
    if (snowboarder.selkirkMatchupId) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.selkirkMatchupId.replace(
        ROUND_SUFFIXES.Selkirk,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      Selkirk.push(snowboarderCopy);
    }
  }
  return {
    Duels,
    Revelstoke,
    Selkirk,
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
