import {
  addUserSelectionsToRounds,
  applyLiveResults,
  getInitialMatchups,
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

      const matchupsWithUserSelections = await addUserSelectionsToRounds({
        matchups: firstRoundMatchups,
        bracketId,
      });

      const matchupsWithLiveWinners = await applyLiveResults({
        matchups: matchupsWithUserSelections,
      });

      // Making a copy so that state gets updated and creates a refresh
      const matchupsCopy = { ...matchupsWithLiveWinners };
      setMatchups(matchupsCopy);
    };
    getData();
  }, [setMatchups, currentRound, bracketId]);
}
