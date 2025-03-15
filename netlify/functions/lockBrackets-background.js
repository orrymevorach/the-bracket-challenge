const { schedule } = require('@netlify/functions');
const fetch = require('node-fetch');

const handler = async function (event, context) {
  // Airtable API details from environment variables
  const AIRTABLE_PERSONAL_ACCESS_TOKEN =
    process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
  const AIRTABLE_BASE = process.env.AIRTABLE_BASE;
  const AIRTABLE_TABLE_NAME = 'Contests';

  try {
    // Update Airtable records
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE_NAME}`;
    const response = await fetch(airtableUrl, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          { id: 'recxoHiOxodDhwqyI', fields: { 'Lock Brackets': 'True' } },
          { id: 'recAf23xWlRh51mMV', fields: { 'Lock Brackets': 'True' } },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Airtable update failed: ${response.statusText}`);
    }

    console.log('Airtable records updated successfully!');

    // Trigger Netlify build
    // await fetch(
    //   `https://thebracketchallenge.com/api/netlify/deploy?secret=${process.env.DEPLOY_SECRET}`,
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({}),
    //   }
    // );

    console.log('Netlify deployment triggered!');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Airtable updated & Netlify deployed' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// module.exports.handler = schedule('30 17 * * *', handler);
module.exports.handler = schedule('12 07 * * *', handler);
