import { getSnowboarders } from '@/lib/airtable';
import { useEffect, useState } from 'react';

const sortSnowboardersByRound = ({ snowboarders }) => {
  let revelstoke = [];
  let duels = [];
  for (let snowboarder of snowboarders) {
    if (snowboarder.revelstokeMatchupId) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      snowboarderCopy.matchupId = snowboarder.revelstokeMatchupId;
      revelstoke.push(snowboarderCopy);
    }
    if (snowboarder.duelsMatchupId) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      snowboarderCopy.matchupId = snowboarder.duelsMatchupId;
      duels.push(snowboarderCopy);
    }
  }
  return {
    revelstoke,
    duels,
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
