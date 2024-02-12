import {
  addNumberOfCorrectPicksToRoundData,
  getRanking,
  sortSelectionsIntoRounds,
} from '@/components/dashboard/bracket-ranking-utils';
import { getBracket, getUser, getWinners } from '@/lib/airtable';

export default async function handler(req, res) {
  const { uid } = req.body;

  const user = await getUser({ uid });
  const userLeagues = user.leagues;
  const userName = user.name;

  const winnersData = await getWinners();

  // Adding data to brackets
  // 1. getting number of correct picks in each bracket, of all the announced winners
  // 2. get the ranking of each bracket compared to brackets in other leagues
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
        bracketId: bracket.id,
      };
    })
  );

  res.status(200).json({ userLeagues: userLeaguesWithBracketRankingData });
}
