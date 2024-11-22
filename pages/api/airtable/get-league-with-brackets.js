import { getLeague } from '@/lib/airtable';
import { getRecordById } from '@/lib/airtable-utils';

function removeUnderscore(key) {
  return key.replace(/_/g, '');
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { leagueId } = req.body;

    try {
      const league = await getLeague({ id: leagueId });
      const bracketIds = league.userBrackets;
      const bracketsWithData = await Promise.all(
        bracketIds.map(async id => {
          const { record: bracket } = await getRecordById({
            tableId: 'User Brackets',
            recordId: id,
          });
          // Format keys to camelCase i.e. d_R1_M1 --> dR1M1
          for (let key in bracket) {
            if (key.includes('_')) {
              const keyWithoutUnderscore = removeUnderscore(key);
              bracket[keyWithoutUnderscore] = bracket[key];
              delete bracket[key];
            }
          }
          return bracket;
        })
      );
      league.userBrackets = bracketsWithData;
      res.status(200).json({ league });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
