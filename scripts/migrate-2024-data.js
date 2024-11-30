const Airtable = require('airtable');
require('dotenv').config({ path: `.env.local` });

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

async function run() {
  const userBracketResponse = await airtableBase('User Brackets').find(
    'recqQjDhjemvdre3h'
  );
  const fields = transformFields({ record: userBracketResponse });
  const entries = Object.entries(fields);

  const winnersBracketResponse = await airtableBase('User Brackets').find(
    'rec8rfwZm4QLY5TXg'
  );
  const winnersFields = transformFields({ record: winnersBracketResponse });

  const Duels = {
    name: 'Duels',
    correctPicks: 0,
    numberOfWinners: 0,
  };
  const DuelsWomen = {
    name: 'DuelsWomen',
    correctPicks: 0,
    numberOfWinners: 0,
  };
  const Revelstoke = {
    name: 'Revelstoke',
    correctPicks: 0,
    numberOfWinners: 0,
  };
  const RevelstokeWomen = {
    name: 'RevelstokeWomen',
    correctPicks: 0,
    numberOfWinners: 0,
  };
  const Selkirk = {
    name: 'Selkirk',
    correctPicks: 0,
    numberOfWinners: 0,
  };
  const SelkirkWomen = {
    name: 'SelkirkWomen',
    correctPicks: 0,
    numberOfWinners: 0,
  };
  const formatted = entries.reduce((acc, curr) => {
    if (curr[0].includes('d_')) {
      const round = curr[0].split('_')[1];
      const matchup = curr[0].split('_')[2];
      const matchupId = `${round}_${matchup}`;
      Duels[matchupId] = {
        selectedWinner: curr[1],
        actualWinner: winnersFields[curr[0]],
        result: curr[1] === winnersFields[curr[0]],
      };
      if (Duels[matchupId].selectedWinner === winnersFields[curr[0]]) {
        Duels.correctPicks++;
      }
      if (winnersFields[curr[0]]) {
        Duels.numberOfWinners++;
      }
    }
    if (curr[0].includes('dW_')) {
      const round = curr[0].split('_')[1];
      const matchup = curr[0].split('_')[2];
      const matchupId = `${round}_${matchup}`;
      DuelsWomen[matchupId] = {
        selectedWinner: curr[1],
        actualWinner: winnersFields[curr[0]],
        result: curr[1] === winnersFields[curr[0]],
      };
      if (DuelsWomen[matchupId].selectedWinner === winnersFields[curr[0]]) {
        DuelsWomen.correctPicks++;
      }
      if (winnersFields[curr[0]]) {
        DuelsWomen.numberOfWinners++;
      }
    }
    if (curr[0].includes('r_')) {
      const round = curr[0].split('_')[1];
      const matchup = curr[0].split('_')[2];
      const matchupId = `${round}_${matchup}`;
      Revelstoke[matchupId] = {
        selectedWinner: curr[1],
        actualWinner: winnersFields[curr[0]],
        result: curr[1] === winnersFields[curr[0]],
      };
      if (Revelstoke[matchupId].selectedWinner === winnersFields[curr[0]]) {
        Revelstoke.correctPicks++;
      }
      if (winnersFields[curr[0]]) {
        Revelstoke.numberOfWinners++;
      }
    }
    if (curr[0].includes('rW_')) {
      const round = curr[0].split('_')[1];
      const matchup = curr[0].split('_')[2];
      const matchupId = `${round}_${matchup}`;
      RevelstokeWomen[matchupId] = {
        selectedWinner: curr[1],
        actualWinner: winnersFields[curr[0]],
        result: curr[1] === winnersFields[curr[0]],
      };
      if (
        RevelstokeWomen[matchupId].selectedWinner === winnersFields[curr[0]]
      ) {
        RevelstokeWomen.correctPicks++;
      }
      if (winnersFields[curr[0]]) {
        RevelstokeWomen.numberOfWinners++;
      }
    }
    if (curr[0].includes('s_')) {
      const round = curr[0].split('_')[1];
      const matchup = curr[0].split('_')[2];
      const matchupId = `${round}_${matchup}`;
      Selkirk[matchupId] = {
        selectedWinner: curr[1],
        actualWinner: winnersFields[curr[0]],
        result: curr[1] === winnersFields[curr[0]],
      };
      if (Selkirk[matchupId].selectedWinner === winnersFields[curr[0]]) {
        Selkirk.correctPicks++;
      }
      if (winnersFields[curr[0]]) {
        Selkirk.numberOfWinners++;
      }
    }
    if (curr[0].includes('sW_')) {
      const round = curr[0].split('_')[1];
      const matchup = curr[0].split('_')[2];
      const matchupId = `${round}_${matchup}`;
      SelkirkWomen[matchupId] = {
        selectedWinner: curr[1],
        actualWinner: winnersFields[curr[0]],
        result: curr[1] === winnersFields[curr[0]],
      };
      if (SelkirkWomen[matchupId].selectedWinner === winnersFields[curr[0]]) {
        SelkirkWomen.correctPicks++;
      }
      if (winnersFields[curr[0]]) {
        SelkirkWomen.numberOfWinners++;
      }
    }
  });

  const selections = [
    Duels,
    DuelsWomen,
    Revelstoke,
    RevelstokeWomen,
    Selkirk,
    SelkirkWomen,
  ];
  return selections;
}

module.exports = run;
