import { getWinners } from '@/lib/airtable';
import { addRank } from '@/lib/airtable-utils';

const Airtable = require('airtable');
const contentful = require('contentful');

// Airtable Config
var airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

const getLeagueWithBrackets = async ({ leagueId }) => {
  const { record: leagueData } = await getRecordById({
    tableId: 'Leagues',
    recordId: leagueId,
  });

  const bracketIds = leagueData?.userBrackets;

  if (!bracketIds) {
    res.status(200).json({ records: leagueData });
  }

  const bracketsWithData = await Promise.all(
    bracketIds.map(async bracketId => {
      const userData = await getUserByRecordId({
        recId: bracketId,
      });
      const selections = userData.selections
        ? JSON.parse(userData.selections)
        : {};
      return {
        ...userData,
        selections,
      };
    })
  );

  leagueData.userBrackets = bracketsWithData;
  return leagueData;
};

export default async function handler(req, res) {
  const { leagueId } = { ...req.body, ...req.query };

  const league = await getLeagueWithBrackets({ leagueId });

  const winners = await getWinners();

  const numberOfWinners = winners?.length || 0;

  // Add logic here ....

  // Add rankings to each bracket based on the total points
  const bracketsRanked = addRank(userBrackets);

  // Loop through one more time and update the record for each bracket in airtable
  bracketsRanked.forEach(async userBracket => {
    await airtableBase('User Brackets').update([
      {
        id: userBracket.id,
        fields: {
          Selections: JSON.stringify(userBracket.selections),
        },
      },
    ]);
  });

  res.status(200).json({ bracketsRanked });
}
