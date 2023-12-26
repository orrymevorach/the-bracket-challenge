import {
  addUserSelectionsToRounds,
  applyLiveResults,
  getInitialMatchups,
} from '@/lib/airtable';
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
      const matchupsWithLiveWinners = await applyLiveResults({
        currentRound,
        matchups: matchupsWithUserSelections,
      });
      setMatchups(matchupsWithLiveWinners);
    };
    getData();
  }, [setMatchups, currentRound, bracketId]);
}
