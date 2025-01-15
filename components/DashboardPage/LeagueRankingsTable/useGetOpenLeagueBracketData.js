import { useEffect } from 'react';
import { fetchBracketById } from '@/components/LoginPage/firebase-utils';
import { findMatchingString } from '@/utils/utils';

export default function useGetOpenLeagueBracketData({
  sports,
  leagueData,
  user,
  setJson,
}) {
  const openLeagueIds = sports.map(({ openLeagueId }) => openLeagueId[0]);
  const isOpenLeague = openLeagueIds.includes(leagueData.id);
  let userBracket;
  if (isOpenLeague) {
    const userBrackets = user.brackets;
    const openLeagueBrackets = leagueData.userBrackets;
    userBracket = findMatchingString(userBrackets, openLeagueBrackets);
  }
  useEffect(() => {
    const getData = async () => {
      const bracketData = await fetchBracketById({
        collectionName: 'leagues',
        docName: leagueData.id,
        subCollectionName: 'brackets',
        bracketId: userBracket,
      });
      setJson([bracketData]);
    };
    if (userBracket) {
      getData();
    }
  }, [leagueData.id, userBracket, setJson]);
}
