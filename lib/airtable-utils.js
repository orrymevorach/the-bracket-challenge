import { toCamelCase } from '@/utils/utils';

export const createRecord = async ({
  tableId,
  newFields,
  endpoint = '/create-record',
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENV_URL}/api/airtable${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableId, newFields }),
      }
    ).then(res => res.json());
    return response;
  } catch (error) {
    console.log('error', error);
  }
};

export async function getRecords({
  tableId,
  endpoint = '/get-records',
  view = 'Grid view',
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENV_URL}/api/airtable${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableId, view }),
      }
    ).then(res => res.json());
    return response;
  } catch (error) {
    console.log('error', error);
  }
}

export async function getRecord({
  tableId,
  field,
  fieldValue,
  endpoint = '/get-record',
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENV_URL}/api/airtable${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableId, field, fieldValue }),
      }
    ).then(res => res.json());
    return response;
  } catch (error) {
    console.log('error', error);
  }
}

export async function getRecordById({
  tableId,
  recordId,
  endpoint = '/get-record-by-id',
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENV_URL}/api/airtable${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableId, recordId }),
      }
    ).then(res => res.json());
    return response;
  } catch (error) {
    console.log('error', error);
  }
}

export const updateRecord = async ({
  tableId,
  recordId,
  newFields,
  endpoint = '/update-record',
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENV_URL}/api/airtable${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableId, newFields, recordId }),
      }
    ).then(res => res.json());
    return response;
  } catch (error) {
    console.log('error', error);
  }
};

export async function getRecordsByFieldValue({
  tableId,
  endpoint = '/get-records-by-field-value',
  fieldName,
  fieldValue,
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENV_URL}/api/airtable${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableId, fieldName, fieldValue }),
      }
    ).then(res => res.json());
    return response;
  } catch (error) {
    console.log('error', error);
  }
}

export const transformFields = ({ record }) => {
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

export function addRank(arr) {
  // Sort the array in descending order based on totalPoints
  arr.sort((a, b) => b.selections?.totalPoints - a.selections?.totalPoints);

  // Initialize rank tracking variables
  let rank = 1;
  let tieRank = 1;

  // Loop through the sorted array and assign ranks
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].selections) {
      arr[i].selections = { totalPoints: 0 };
    }
    if (
      i > 0 &&
      arr[i].selections.totalPoints === arr[i - 1].selections.totalPoints
    ) {
      // If current totalPoints is equal to the previous one, it's a tie, assign the same rank
      arr[i].selections.leagueRank = tieRank;
    } else {
      // Otherwise, update tieRank to the current rank
      arr[i].selections.leagueRank = rank;
      tieRank = rank;
    }
    // Increment rank for the next object
    rank++;
  }

  return arr;
}
