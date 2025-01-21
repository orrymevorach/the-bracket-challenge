import { transformFields } from '@/lib/airtable-utils';
const Airtable = require('airtable');
const { TABLES } = require('@/utils/constants');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const axios = require('axios');
const tmp = require('tmp'); // For handling temp files
const fs = require('fs');

const serviceAccount = {
  type: 'service_account',
  project_id: 'natural-selection-35f10',
  private_key_id: process.env.FIREBASE_SERVICE_ACCOUNT_private_key_id,
  private_key: process.env.FIREBASE_SERVICE_ACCOUNT_private_key,
  client_email: process.env.FIREBASE_SERVICE_ACCOUNT_client_email,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-irs5t%40natural-selection-35f10.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'natural-selection-35f10.firebasestorage.app', // Replace with your storage bucket name
});

const db = getFirestore();
const storage = getStorage();

// Airtable Config
var airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

const uploadImageToFireStore = async ({ imageUrl, imageName, filePath }) => {
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
};

const addSnowboarder = async ({ imageUrl, snowboarderData, flagUrl }) => {
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
};

export default async function handler(req, res) {
  const { recordId } = req.query;

  try {
    const response = await airtableBase(TABLES.SNOWBOARDERS).find(recordId);
    //   const record = response[0];
    const fields = transformFields({ record: response });
    const transformedRecord = {
      ...fields,
      id: fields.id,
    };
    const { image, flag, ...snowboarderData } = transformedRecord;
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
      snowboarderData: transformedRecord,
      flagUrl,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
}
