const { schedule } = require('@netlify/functions');
const fetch = require('node-fetch');

const handler = async function (event, context) {
  // Airtable API details from environment variables
  const AIRTABLE_PERSONAL_ACCESS_TOKEN =
    process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
  const AIRTABLE_BASE = process.env.AIRTABLE_BASE;
  const AIRTABLE_TABLE_NAME = 'Contests';
  const NETLIFY_BUILD_HOOK = process.env.NETLIFY_BUILD_HOOK;

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
          { id: 'rec6Bo638LqnaCtx3', fields: { 'Lock Brackets': true } },
          { id: 'recvLoL2payK7901n', fields: { 'Lock Brackets': true } },
          { id: 'recq7aE672G7eJUzx', fields: { 'Lock Brackets': true } },
          { id: 'reciulRlhQoChDpwS', fields: { 'Lock Brackets': true } },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Airtable update failed: ${response.statusText}`);
    }

    console.log('Airtable records updated successfully!');

    // Trigger Netlify build
    await fetch(NETLIFY_BUILD_HOOK, {
      method: 'POST',
      body: JSON.stringify({}),
    });

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

module.exports.handler = schedule('11 9 * * *', handler);
