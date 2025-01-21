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

async function getRecords({ tableId, view }) {
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
  const members = await getRecords({ tableId: 'Members', view: 'Grid view' });
  const formattedMembers = members.map(member => {
    return {
      uid: member.uID,
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName || '',
      username: member.username,
      emailAddress: member.emailAddress,
      leagues: member.leagues || [],
      brackets: member.brackets || [],
      adminLeagues: member.adminLeagues || [],
      created: member.created,
    };
  });

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const membersCollection = collection(db, 'members');
  for (let member of formattedMembers) {
    const memberDoc = doc(membersCollection, member.uid);
    await setDoc(memberDoc, member);
    console.log(
      'Member added: ',
      member.firstName + member.lastName,
      member.uid
    );
  }
}
run();
