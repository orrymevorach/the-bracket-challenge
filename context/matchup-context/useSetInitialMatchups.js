import { addUserSelectionsToRounds, getInitialMatchups } from '@/lib/airtable';
import { useEffect } from 'react';

export default function useSetInitialMatchups({
  setMatchups,
  currentRound,
  bracketId,
}) {
  useEffect(() => {
    const getData = async () => {
      const firstRoundMatchups = await getInitialMatchups({ currentRound });
      const matchupsWithUserSelections = await addUserSelectionsToRounds({
        matchups: firstRoundMatchups,
        bracketId,
        currentRound,
      });
      setMatchups(matchupsWithUserSelections);
    };
    getData();
  }, [setMatchups, currentRound, bracketId]);
}
