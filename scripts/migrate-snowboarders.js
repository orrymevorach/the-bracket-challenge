const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const path = require('path');
const Airtable = require('airtable');
const axios = require('axios');
const tmp = require('tmp'); // For handling temp files
const fs = require('fs');

require('dotenv').config({ path: `.env.local` });

const serviceAccount = require('../firebase/natural-selection-35f10-firebase-adminsdk-irs5t-4d69211e58.json');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'natural-selection-35f10.firebasestorage.app', // Replace with your storage bucket name
});

const db = getFirestore();
const storage = getStorage();

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

async function uploadImageToFireStore({ imageUrl, imageName, filePath }) {
  try {
    const bucket = storage.bucket();
    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'arraybuffer',
    });

    const tempFile = tmp.fileSync();
    fs.writeFileSync(tempFile.name, response.data);

    const destination = `${filePath}/${imageName}`;
    const [file] = await bucket.upload(tempFile.name, {
      destination,
      public: true,
      metadata: { cacheControl: 'public, max-age=31536000' },
    });

    const imageUrlInStorage = file.publicUrl();
    console.log(`Image uploaded successfully: ${imageUrlInStorage}`);
    return imageUrlInStorage;
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }
}

async function addSnowboarder({ imageUrl, snowboarderData, flagUrl }) {
  try {
    const snowboarderId = snowboarderData.id;

    // Save the snowboarder data and image URL to Firestore
    const snowboarderRef = db.collection('snowboarders').doc(snowboarderId);
    await snowboarderRef.set({
      ...snowboarderData,
      image: [
        {
          url: imageUrl,
          width: snowboarderData.image[0].width,
          height: snowboarderData.image[0].height,
          filename: snowboarderData.image[0].filename,
        },
      ],
      flag: [
        {
          url: flagUrl,
          width: snowboarderData.flag[0].width,
          height: snowboarderData.flag[0].height,
          filename: snowboarderData.flag[0].filename,
        },
      ],
    });
  } catch (error) {
    console.error('Error uploading image or saving data:', error.message);
    throw error;
  }
}

async function run() {
  const sport = 'nstsnow';
  const { snowboarders } = await getSnowboardersBySport({ sport });
  for (let snowboarder of snowboarders) {
    const { image, flag, ...snowboarderData } = snowboarder;
    const imageUrl = await uploadImageToFireStore({
      imageUrl: image[0].url,
      imageName: snowboarderData.name,
      filePath: 'snowboarders',
    });
    const flagUrl = await uploadImageToFireStore({
      imageUrl: flag[0].url,
      imageName: flag[0].filename,
      filePath: 'snowboarders/flags',
    });
    await addSnowboarder({
      imageUrl,
      snowboarderData: snowboarder,
      flagUrl,
    });
  }
}
run();
