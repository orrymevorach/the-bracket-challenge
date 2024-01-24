import {
  // addUserSelectionsToRounds,
  applyLiveResults,
  getInitialMatchups,
} from '@/lib/airtable';
import { useEffect } from 'react';
import addUserSelectionsToRounds from './add-user-selections-to-round';

export default function useSetMatchups({
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
