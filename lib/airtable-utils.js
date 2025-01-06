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
  formulaArray,
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENV_URL}/api/airtable${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableId, formulaArray }),
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
