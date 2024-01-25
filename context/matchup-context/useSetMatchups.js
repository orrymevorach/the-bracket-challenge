import {
  addUserSelectionsToRounds,
  applyLiveResults,
  getBracket,
  getInitialMatchups,
  getWinners,
} from '@/lib/airtable';
import { useEffect } from 'react';
// import addUserSelectionsToRounds from './add-user-selections-to-round';

export default function useSetMatchups({
  setMatchups,
  currentRound,
  bracketId,
}) {
  useEffect(() => {
    const getData = async () => {
      const firstRoundMatchups = await getInitialMatchups();
      const bracket = await getBracket({ recId: bracketId });

      const matchupsWithUserSelections = await addUserSelectionsToRounds({
        matchups: firstRoundMatchups,
        bracket,
      });

      const winners = await getWinners();
      const matchupsWithLiveWinners = await applyLiveResults({
        matchups: matchupsWithUserSelections,
        winners,
      });

      // Making a copy so that state gets updated and creates a refresh
      const matchupsCopy = { ...matchupsWithLiveWinners };
      setMatchups(matchupsCopy);
    };
    getData();
  }, [setMatchups, currentRound, bracketId]);
}
