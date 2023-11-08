import { useEffect, useState } from 'react';
import { getBracket, getLeague } from '@/lib/airtable';
import {
  countNumberOfCorrectPicks,
  countNumberOfWinners,
  getRanking,
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
          const leagueData = await getLeague({ name: leagueName });
          const numberOfCorrectPicks = countNumberOfCorrectPicks({
            bracketData: bracket,
            winners: winnersData,
          });
          const ranking = getRanking({
            leagueData,
            winnersData,
            bracketName: name,
          });
          const numberOfWinners = countNumberOfWinners({
            winners: winnersData,
          });
          return {
            ...userBracket,
            numberOfCorrectPicks,
            ranking,
            numberOfWinners,
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
