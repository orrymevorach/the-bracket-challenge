import { transformFields } from '@/lib/airtable-utils';
const Airtable = require('airtable');

// Airtable Config
const airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tableId, recordId, newFields, enableCache = false } = req.body;
    if (!enableCache) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
    try {
      const response = await airtableBase(tableId).update([
        {
          id: recordId,
          fields: { ...newFields },
        },
      ]);
      const record = response[0];
      const fields = transformFields({ record });
      const transformedRecord = {
        ...fields,
        id: record.id,
      };
      res.status(200).json({ record: transformedRecord });
    } catch (err) {
      console.log('error', err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
