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

const getRecordsByFieldValue = async ({ formulaArray, tableId }) => {
  const formula = formulaArray
    .map(({ fieldName, fieldValue }) => {
      return `{${fieldName}} = "${fieldValue}"`;
    })
    .join(', ');

  const records = [];
  await airtableBase(tableId)
    .select({
      filterByFormula: `AND(${formula})`,
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

  return { records: recordsWithIds };
};

const getSnowboardersBySport = async ({ sport }) => {
  const { records: snowboarders } = await getRecordsByFieldValue({
    tableId: 'Snowboarders',
    formulaArray: [
      {
        fieldName: 'Sport',
        fieldValue: sport,
      },
    ],
  });
  const removeUneededData = snowboarders.map(snowboarder => {
    return {
      ...snowboarder,
      matchups: null,
      matchups2: null,
      matchups3: null,
    };
  });
  return { snowboarders: removeUneededData };
};

async function getMatchupsBySport({ sport }) {
  const { records: matchups } = await getRecordsByFieldValue({
    tableId: 'Matchups',
    formulaArray: [
      {
        fieldName: 'Sport',
        fieldValue: sport,
      },
    ],
  });

  return matchups;
}

const mapRoundToPoints = {
  1: 10,
  2: 20,
  3: 40,
  4: 80,
};

function addRank(arr) {
  // Sort the array in descending order based on totalPoints
  arr.sort((a, b) => b.rankData?.totalPoints - a.rankData?.totalPoints);

  // Initialize rank tracking variables
  let rank = 1;
  let tieRank = 1;

  // Loop through the sorted array and assign ranks
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].rankData) {
      arr[i].rankData = { totalPoints: 0 };
    }
    if (
      i > 0 &&
      arr[i].rankData.totalPoints === arr[i - 1].rankData.totalPoints
    ) {
      // If current totalPoints is equal to the previous one, it's a tie, assign the same rank
      arr[i].rankData.rank = tieRank;
      arr[i].rank = tieRank;
    } else {
      // Otherwise, update tieRank to the current rank
      arr[i].rankData.rank = rank;
      arr[i].rank = rank;
      tieRank = rank;
    }
    // Increment rank for the next object
    rank++;
  }

  return arr;
}

async function run() {
  const sport = 'nst2024';
  const { snowboarders } = await getSnowboardersBySport({ sport });

  const snowboarderAsMap = snowboarders.reduce((acc, snowboarder) => {
    acc[snowboarder.id] = snowboarder.name;
    return acc;
  }, {});

  const matchups = await getMatchupsBySport({ sport });

  let winners = [];
  for (let matchup of matchups) {
    if (matchup.actualWinner) {
      const round = parseFloat(matchup.round);
      const points = mapRoundToPoints[round];
      winners.push({
        matchupId: matchup.matchupId,
        winner: snowboarderAsMap[matchup.actualWinner[0]],
        points,
        subBracket: matchup.subBracket[0],
        contest: matchup.contest[0],
      });
    }
  }
  const openLeague = await airtableBase('Leagues').find('recrKlmzDj22vkpf9');
  const allBrackets = openLeague.fields['User Brackets'];
  const updatedBrackets = await Promise.all(
    allBrackets.map(async bracketId => {
      const bracket = await airtableBase('User Brackets').find(bracketId);
      const bracketFields = transformFields({ record: bracket });
      if (!bracketFields.userName?.[0]) {
        return;
      }
      const parsedSelections = bracketFields?.selections
        ? JSON.parse(bracketFields.selections)
        : [];
      let rounds = [];

      const rankData = {
        correctPicks: 0,
        totalPoints: 0,
        numberOfWinners: 0,
      };
      const updatedSelections = parsedSelections.map(subBracket => {
        for (let winner of winners) {
          if (
            subBracket.subBracket === winner.subBracket &&
            subBracket.name === winner.contest
          ) {
            const { matchupId, winner: actualWinner, points } = winner;
            if (subBracket[matchupId] === actualWinner) {
              rankData.correctPicks += 1;
              rankData.totalPoints += points;
              rankData.numberOfWinners += 1;
            } else {
              rankData.numberOfWinners += 1;
            }
          }
        }

        const arrayOfSubBrackets = Object.entries(subBracket);
        for (let entry of arrayOfSubBrackets) {
          const [matchupId, winner] = entry;
          if (!matchupId.includes('_')) continue;
          const roundNumber = parseInt(matchupId.split('_')[0].slice(1));
          const matchupNumber = parseInt(matchupId.split('_')[1].slice(1));
          rounds.push({
            roundNumber,
            matchupNumber,
            winner,
          });
          delete subBracket[matchupId];
        }
        return {
          ...subBracket,
          rounds,
        };
      });

      return {
        bracketName: bracketFields.name,
        id: bracketFields.id,
        rankData,
        selections: updatedSelections,
      };
    })
  );

  const filteredSelections = updatedBrackets.filter(bracket => {
    if (!bracket) return false;
    if (!bracket.bracketName) return false;
    return true;
  });

  const rankedSelections = addRank(filteredSelections);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const leaguesCollection = collection(db, 'leagues');
  const theOpenDoc = doc(leaguesCollection, `recrKlmzDj22vkpf9`);
  const bracketsCollection = collection(theOpenDoc, 'brackets');
  for (const bracket of rankedSelections) {
    const bracketDoc = doc(bracketsCollection, bracket.id); // Use the `id` as the document ID
    await setDoc(bracketDoc, bracket);
    console.log(`Bracket ${bracket.id} written successfully!`);
  }
}
run();
