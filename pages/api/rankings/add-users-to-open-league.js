import { getBracket, getLeague } from '@/lib/firebase';
import { getAllRecords, updateRecord } from '@/lib/firebase-utils';
import { TABLES } from '@/utils/constants';

export default async function addUsersToOpenLeague() {
  const users = await getAllRecords(TABLES.MEMBERS);
  const openLeagueId = 'recffMjjlVePQsbfb';
  const openLeagueData = await getLeague({ id: openLeagueId });
  const openLeagueBrackets = openLeagueData.userBrackets;
  let updatedOpenLeagueBrackets = [...openLeagueBrackets];
  for (let user of users) {
    const userBrackets = user.brackets;
    if (!userBrackets?.length) {
      continue;
    }

    for (let bracketId of userBrackets) {
      const isInOpenLeague = openLeagueBrackets.includes(bracketId);
      if (isInOpenLeague) {
        continue;
      }
      const bracketData = await getBracket({ recId: bracketId });
      const sport = bracketData?.sport;
      if (sport !== 'nstsnow') {
        continue;
      }
      // Add bracket to open league
      updatedOpenLeagueBrackets.push(bracketId);
    }
  }
  try {
    await updateRecord({
      tableId: TABLES.LEAGUES,
      recordId: openLeagueId,
      newFields: {
        userBrackets: updatedOpenLeagueBrackets,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
