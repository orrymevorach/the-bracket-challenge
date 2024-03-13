import {
  addUserSelectionsToRounds,
  applyLiveResults,
  getBracket,
  getInitialMatchups,
  getWinners,
} from '@/lib/airtable';
import { useEffect, useState } from 'react';
// import addUserSelectionsToRounds from './add-user-selections-to-round';

export default function useSetMatchups({
  setMatchups,
  currentRound,
  bracketId,
}) {
  const [snowboardersData, setSnowboardersData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const { firstRoundMatchups, snowboarders } = await getInitialMatchups();
      // Part 1: Create snowboarders map, where each snowboarders name is the key
      const snowboardersMap = snowboarders.reduce((acc, curr) => {
        acc[curr.name] = curr;
        return acc;
      }, {});

      // Part 2: Set Matchups
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
      setSnowboardersData(snowboardersMap);
    };
    if (bracketId) {
      getData();
    }
  }, [setMatchups, currentRound, bracketId]);

  return { snowboarders: snowboardersData };
}
