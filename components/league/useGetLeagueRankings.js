import { getLeagueBrackets } from '@/lib/airtable';
import { useEffect, useState } from 'react';
import { useWinners } from '@/context/winners-context/winners-context';
import {
  addNumberOfCorrectPicksToRoundData,
  getRanking,
  sortSelectionsIntoRounds,
} from '@/components/dashboard/bracket-ranking-utils';
import { useRouter } from 'next/router';

export default function useGetLeagueRankings() {
  const {
    query: { leagueId },
  } = useRouter();
  const [bracketsSortedByRankings, setBracketsSortedByRankings] =
    useState(null);
  const winnersData = useWinners();
  useEffect(() => {
    const handleGetBracketsSortedByRankings = async () => {
      const league = await getLeagueBrackets({ id: leagueId });
      const leagueWithRankingsAndNumberOfCorrectPicks = league.userBrackets.map(
        bracket => {
          const rank = getRanking({
            leagueData: league,
            winnersData,
            bracketId: bracket.id,
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
      setBracketsSortedByRankings(leagueWithRankingsAndNumberOfCorrectPicks);
    };
    if (winnersData) {
      handleGetBracketsSortedByRankings();
    }
  }, [leagueId, winnersData]);
  return { bracketsSortedByRankings };
}
