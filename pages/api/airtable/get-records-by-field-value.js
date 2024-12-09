import { transformFields } from '@/lib/airtable-utils';

const Airtable = require('airtable');

// Airtable Config
const airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tableId, fieldName, fieldValue } = req.body;
    try {
      const records = [];
      await airtableBase(tableId)
        .select({
          filterByFormula: `{${fieldName}} = "${fieldValue}"`, // Use Airtable's formula syntax
        })
        .eachPage((pageRecords, fetchNextPage) => {
          records.push(...pageRecords);
          fetchNextPage();
        });

      const recordsWithIds = records.map(record => {
        const fields = transformFields({ record });
        return {
          id: record.getId(),
          ...fields,
        };
      });

      res.status(200).json({ records: recordsWithIds });
    } catch (err) {
      console.log('Error:', err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
