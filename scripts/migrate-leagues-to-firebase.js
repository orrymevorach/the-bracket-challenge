const Airtable = require('airtable');
require('dotenv').config({ path: `.env.local` });

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, collection, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Airtable Config
const airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

const transformFields = ({ record }) => {
  let transformedFieldsObj = {};
  const entries = Object.entries(record.fields);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    const transformedKey = toCamelCase(key);
    transformedFieldsObj[transformedKey] = value;
    transformedFieldsObj.id = record.id;
  }
  return transformedFieldsObj;
};

function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

async function getRecords({ tableId, view = 'Grid view' }) {
  const recordsArray = [];
  await airtableBase(tableId)
    .select({ view })
    .eachPage((records, fetchNextPage) => {
      records.forEach(record => {
        const fields = transformFields({ record });
        record.fields.id = record.getId();
        recordsArray.push(fields);
      });
      fetchNextPage();
    });
  return recordsArray;
}

async function run() {
  const leauges = await getRecords({ tableId: 'Leagues' });
  const filteredLeagues = leauges.filter(league => {
    if (league.sport[0] === 'nstsnow') return true;
    return false;
  });
  const formattedLeagues = filteredLeagues.map(league => {
    return {
      name: league.name,
      id: league.id,
      members: league.members || [],
      userBrackets: league.userBrackets || [],
      created: league.created,
      invitations: league.invitations ? JSON.parse(league.invitations) : [],
      json: league.json ? JSON.parse(league.json) : [],
      sport: league.sport[0],
      admin: league.admin ? league.admin[0] : '',
    };
  });

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const leaguesCollection = collection(db, 'leagues-2025');
  for (let league of formattedLeagues) {
    const leagueDoc = doc(leaguesCollection, league.id);
    await setDoc(leagueDoc, league);
    console.log('league added: ', league.name);
  }
}
run();
