import { getInitialMatchups } from '@/lib/airtable';
import { useEffect } from 'react';

export default function useSetInitialMatchups({ setMatchups, currentRound }) {
  useEffect(() => {
    const getData = async () => {
      const firstRoundMatchups = await getInitialMatchups({ currentRound });
      setMatchups(firstRoundMatchups);
    };
    getData();
  }, [setMatchups, currentRound]);
}
