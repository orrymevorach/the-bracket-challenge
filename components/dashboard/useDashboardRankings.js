import { useEffect, useState } from 'react';
import { getBracket } from '@/lib/airtable';
import {
  addNumberOfCorrectPicksToRoundData,
  getRanking,
  sortSelectionsIntoRounds,
} from './bracket-ranking-utils';

export default function useDashboardRankings({
  userLeagues = [],
  winnersData,
  userName,
}) {
  const [leagueData, setLeagueData] = useState(null);

  // Adding data to brackets
  // 1. getting number of correct picks in each bracket, of all the announced winners
  // 2. get the ranking of each bracket compared to brackets in other leagues

  useEffect(() => {
    const getLeagueData = async () => {
      const userLeaguesWithBracketRankingData = await Promise.all(
        userLeagues.map(async league => {
          const userBracket = league.userBrackets.find(
            bracket => bracket.userName[0] === userName
          );
          if (!userBracket) {
            return {
              id: league.id,
              bracketName: '',
              leagueName: league.name,
            };
          }
          const bracket = await getBracket({ recId: userBracket.id });
          const selectionsSortedByRoundWithNumberOfWinnersPerRound =
            sortSelectionsIntoRounds(bracket);
          addNumberOfCorrectPicksToRoundData({
            bracketData: selectionsSortedByRoundWithNumberOfWinnersPerRound,
            winnersData,
          });
          const ranking = getRanking({
            leagueData: league,
            winnersData,
            bracketName: userBracket.name,
          });
          return {
            id: league.id,
            bracketName: userBracket.name,
            leagueName: league.name,
            ranking,
            selectedWinners: selectionsSortedByRoundWithNumberOfWinnersPerRound,
          };
        })
      );

      setLeagueData(userLeaguesWithBracketRankingData);
    };
    if (!leagueData && winnersData && userLeagues.length && userName) {
      getLeagueData();
    }
  }, [winnersData, userLeagues, userName, leagueData]);
  return {
    leagueData,
  };
}
