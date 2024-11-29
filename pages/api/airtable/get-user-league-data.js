import {
  addNumberOfCorrectPicksToRoundData,
  getRanking,
  sortSelectionsIntoRounds,
} from '@/components/DashboardPage/bracket-ranking-utils';
import { getBracket, getLeague, getUser, getWinners } from '@/lib/airtable';
import { getRecord } from '@/lib/airtable-utils';
import { removeUnderscore } from '@/utils/utils';

export default async function handler(req, res) {
  const { uid } = req.body;

  const winnersData = await getWinners();
  // const user = await getUserWithLeagueData({ uid });
  const { record: user } = await getRecord({
    tableId: 'Members',
    field: 'UID',
    fieldValue: uid,
    endpoint: '/get-user-by-uid',
  });

  const userLeagues = user.leagues || [];

  // Adding data to brackets
  // 1. getting number of correct picks in each bracket, of all the announced winners
  // 2. get the ranking of each bracket compared to brackets in other leagues
  const userLeaguesWithBracketRankingData = await Promise.all(
    userLeagues.map(async leagueId => {
      const league = await getLeague({ id: leagueId });
      const userBracketId = league.userBrackets.find(bracketId =>
        user.brackets.includes(bracketId)
      );

      if (!userBracketId) {
        return {
          id: leagueId,
          bracketName: '',
          leagueName: league.name,
        };
      }

      const bracket = await getBracket({ recId: userBracketId });
      const bracketName = bracket.name;

      for (let key in bracket) {
        const keyWithoutUnderscore = removeUnderscore(key);
        bracket[keyWithoutUnderscore] = bracket[key];
        delete bracket[key];
      }

      const selectionsSortedByRoundWithNumberOfWinnersPerRound =
        sortSelectionsIntoRounds(bracket);
      addNumberOfCorrectPicksToRoundData({
        bracketData: selectionsSortedByRoundWithNumberOfWinnersPerRound,
        winnersData,
      });

      const ranking = getRanking({
        leagueData: league,
        winnersData,
        bracketId: userBracketId,
      });

      return {
        id: league.id,
        bracketName,
        leagueName: league.name,
        ranking,
        selectedWinners: selectionsSortedByRoundWithNumberOfWinnersPerRound,
        bracketId: userBracketId,
      };
    })
  );

  res.status(200).json({ userLeagues: userLeaguesWithBracketRankingData });
}
