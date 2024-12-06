// const Airtable = require('airtable');
// require('dotenv').config({ path: `.env.local` });

// // Airtable Config
// const airtableBase = new Airtable({
//   apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
// }).base(process.env.AIRTABLE_BASE);

// const transformFields = ({ record }) => {
//   let transformedFieldsObj = {};
//   const entries = Object.entries(record.fields);
//   for (let i = 0; i < entries.length; i++) {
//     const [key, value] = entries[i];
//     const transformedKey = toCamelCase(key);
//     transformedFieldsObj[transformedKey] = value;
//     transformedFieldsObj.id = record.id;
//   }
//   return transformedFieldsObj;
// };

// function toCamelCase(str) {
//   return str
//     .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
//       return index === 0 ? word.toLowerCase() : word.toUpperCase();
//     })
//     .replace(/\s+/g, '');
// }

// async function run() {
//   const winnersBracketResponse = await airtableBase('User Brackets').find(
//     'rec8rfwZm4QLY5TXg'
//   );
//   const winnersFields = transformFields({ record: winnersBracketResponse });

//   const leagueRes = await airtableBase('Leagues').find('recN2f8SSlcH1qcXK');
//   const fields = transformFields({ record: leagueRes });

//   const brackets = fields.userBrackets;
//   const bracketsWithData = await Promise.all(
//     brackets.map(async bracketId => {
//       const bracket = await airtableBase('User Brackets').find(bracketId);
//       const bracketFields = transformFields({ record: bracket });
//       const member = await airtableBase('Members').find(
//         bracketFields.memberID[0]
//       );
//       const memberFields = transformFields({ record: member });

//       return {
//         name: memberFields.lastName
//           ? `${memberFields.firstName} ${memberFields.lastName}`
//           : memberFields.firstName,
//         userName: bracketFields.userName ? bracketFields.userName[0] : '',
//         bracketName: bracketFields.name,
//         userId: bracketFields.memberID[0],
//         id: bracket.id,
//       };
//     })
//   );
//   console.log('bracketsWithData', bracketsWithData);
// }

// run();
