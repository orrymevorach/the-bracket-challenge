const { updateRecord } = require('@/lib/airtable-utils');
const { schedule } = require('@netlify/functions');
const fetch = require('node-fetch');

const handler = async function (event, context) {
  const records = [
    'rec6Bo638LqnaCtx3',
    'recvLoL2payK7901n',
    'recq7aE672G7eJUzx',
    'reciulRlhQoChDpwS',
  ];

  try {
    // Update Airtable records
    for (let record of records) {
      await updateRecord({
        tableId: 'Contests',
        recordId: record,
        newFields: {
          'Lock Brackets': 'True',
        },
      });
    }

    if (!response.ok) {
      throw new Error(`Airtable update failed: ${response.statusText}`);
    }

    console.log('Airtable records updated successfully!');

    // Trigger Netlify build
    await fetch(
      `https://api.netlify.com/build_hooks/${process.env.NETLIFY_BUILD_HOOK}`,
      {
        method: 'POST',
        body: JSON.stringify({}),
      }
    );

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

module.exports.handler = schedule('25 9 * * *', handler);
