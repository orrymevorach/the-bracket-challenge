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
  const brackets = await getRecords({ tableId: 'User Brackets' });
  const filteredLeagues = brackets.filter(bracket => {
    if (!bracket.sport) return false;
    if (bracket.sport[0] === 'nstsnow') return true;
    return false;
  });
  const formattedBrackets = filteredLeagues.map(bracket => {
    return {
      name: bracket.name,
      id: bracket.id,
      memberId: bracket.memberID?.[0],
      userName: bracket.userName?.[0],
      leagueId: bracket.leagueId?.[0],
      selections: bracket.selections ? JSON.parse(bracket.selections) : {},
      sport: bracket.sport?.[0],
      created: bracket.created,
    };
  });

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const bracketsCollection = collection(db, 'brackets-2025');
  for (let bracket of formattedBrackets) {
    const bracketDoc = doc(bracketsCollection, bracket.id);
    await setDoc(bracketDoc, bracket);
    console.log('bracket added: ', bracket.name);
  }
}
run();
