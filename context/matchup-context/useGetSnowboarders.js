import { getSnowboarders } from '@/lib/airtable';
import { ROUND_SUFFIXES } from '@/utils/constants';
import { useEffect, useState } from 'react';

const sortSnowboardersByRound = ({ snowboarders }) => {
  let duels = [];
  let revelstoke = [];
  let selkirk = [];

  for (let snowboarder of snowboarders) {
    const snowboarderCopy = { ...snowboarder };
    if (snowboarder.duelsMatchupId) {
      // Renaming field to make it generic
      const matchupId = snowboarder.duelsMatchupId.replace(
        ROUND_SUFFIXES.Duels,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      duels.push(snowboarderCopy);
    }
    if (snowboarder.revelstokeMatchupId) {
      // Renaming field to make it generic
      const matchupId = snowboarder.revelstokeMatchupId.replace(
        ROUND_SUFFIXES.Revelstoke,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      revelstoke.push(snowboarderCopy);
    }
    if (snowboarder.selkirkMatchupId) {
      // Renaming field to make it generic
      const matchupId = snowboarder.selkirkMatchupId.replace(
        ROUND_SUFFIXES.Selkirk,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      selkirk.push(snowboarderCopy);
    }
  }
  return {
    duels,
    revelstoke,
    selkirk,
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
