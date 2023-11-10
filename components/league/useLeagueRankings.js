import { getLeague } from '@/lib/airtable';
import { useEffect, useState } from 'react';
import { useWinners } from '@/context/winners-context/winners-context';
import {
  addNumberOfCorrectPicksToRoundData,
  getRanking,
  sortSelectionsIntoRounds,
} from '@/components/dashboard/bracket-ranking-utils';

export default function useLeagueRankings({ slug }) {
  const [leagueData, setLeagueData] = useState(null);
  const winnersData = useWinners();
  useEffect(() => {
    const handleGetLeagueData = async () => {
      const league = await getLeague({ name: slug });
      const leagueWithRankingsAndNumberOfCorrectPicks = league.brackets.map(
        bracket => {
          const rank = getRanking({
            leagueData: league,
            winnersData,
            bracketName: bracket.name,
          });
          const selectionsSortedByRoundWithNumberOfWinnersPerRound =
            sortSelectionsIntoRounds(bracket);
          addNumberOfCorrectPicksToRoundData({
            bracketData: selectionsSortedByRoundWithNumberOfWinnersPerRound,
            winnersData,
          });
          return {
            ...bracket,
            rank,
            selectedWinners: selectionsSortedByRoundWithNumberOfWinnersPerRound,
          };
        }
      );
      setLeagueData(leagueWithRankingsAndNumberOfCorrectPicks);
    };
    if (winnersData) {
      handleGetLeagueData();
    }
  }, [slug, winnersData]);
  return { leagueData };
}
