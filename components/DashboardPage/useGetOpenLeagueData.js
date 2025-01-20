import { useEffect, useState } from 'react';
import { fetchSubcollection } from '@/lib/firebase-utils';

export default function useGetOpenLeagueData({ leagueId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getOpenLeaguedata() {
      const openLeagueResponse = await fetchSubcollection({
        collectionName: 'leagues',
        docName: leagueId,
        subCollectionName: 'brackets',
      });

      const formattedBrackets = openLeagueResponse?.map(bracket => {
        const updatedSelections = bracket.selections.map(subBracketData => {
          const roundSelections = {};
          for (let round of subBracketData.rounds) {
            const matchupId = `R${round.matchupNumber}_M${round.matchupNumber}`;
            const winner = round.winner;
            roundSelections[matchupId] = winner;
          }
          return {
            ...subBracketData,
            ...roundSelections,
            rounds: null,
          };
        });
        return {
          ...bracket,
          selections: updatedSelections,
        };
      });
      setData(formattedBrackets);
    }

    if (!data.length && leagueId) {
      getOpenLeaguedata();
    }
  }, [data.length, leagueId]);

  return data;
}
