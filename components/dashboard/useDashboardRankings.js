import { useEffect, useState } from 'react';
import { getBracket, getLeague } from '@/lib/airtable';
import {
  addNumberOfCorrectPicksToRoundData,
  getRanking,
  sortSelectionsIntoRounds,
} from './bracket-ranking-utils';

export default function useDashboardRankings({
  userBrackets = [],
  winnersData,
}) {
  const [bracketData, setBracketData] = useState(null);

  // Adding data to brackets
  // 1. getting number of correct picks in each bracket, of all the announced winners
  // 2. get the ranking of each bracket compared to brackets in other leagues

  useEffect(() => {
    const getBracketData = async () => {
      const userBracketsWithRankingData = await Promise.all(
        userBrackets.map(async userBracket => {
          const { id, leagueName, name } = userBracket;
          const bracket = await getBracket({ recId: id });
          const selectionsSortedByRoundWithNumberOfWinnersPerRound =
            sortSelectionsIntoRounds(bracket);
          addNumberOfCorrectPicksToRoundData({
            bracketData: selectionsSortedByRoundWithNumberOfWinnersPerRound,
            winnersData,
          });
          const leagueData = await getLeague({ name: leagueName });

          const ranking = getRanking({
            leagueData,
            winnersData,
            bracketName: name,
          });

          return {
            ...userBracket,
            ranking,
            selectedWinners: selectionsSortedByRoundWithNumberOfWinnersPerRound,
          };
        })
      );

      setBracketData(userBracketsWithRankingData);
    };
    if (!bracketData && winnersData && userBrackets.length) {
      getBracketData();
    }
  }, [bracketData, winnersData, userBrackets]);
  return {
    bracketData,
  };
}
