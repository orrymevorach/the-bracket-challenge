const Airtable = require('airtable');
require('dotenv').config({ path: `.env.local` });

// Airtable Config
const airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

const mapRoundToPoints = {
  R1: 1,
  R2: 2,
  R3: 4,
  R4: 8,
};

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

function calculateRanks(dataArray) {
  // Step 1: Calculate totals for each object and add a 'rankData' property
  dataArray.forEach(bracket => {
    const totalPoints = bracket.selections.reduce(
      (sum, selection) => sum + selection.totalPoints,
      0
    );
    const correctPicks = bracket.selections.reduce(
      (sum, selection) => sum + selection.correctPicks,
      0
    );
    const numberOfWinners = bracket.selections.reduce(
      (sum, selection) => sum + selection.numberOfWinners,
      0
    );

    bracket.rankData = {
      totalPoints,
      correctPicks,
      numberOfWinners,
      rank: null, // Placeholder for rank, calculated later
    };
  });

  // Step 2: Sort by totalPoints in descending order
  const sortedData = [...dataArray].sort(
    (a, b) => b.rankData.totalPoints - a.rankData.totalPoints
  );

  // Step 3: Assign ranks, handling ties
  sortedData.forEach((bracket, index) => {
    if (
      index > 0 &&
      bracket.rankData.totalPoints ===
        sortedData[index - 1].rankData.totalPoints
    ) {
      // If tied, assign the same rank as the previous bracket
      bracket.rankData.rank = sortedData[index - 1].rankData.rank;
    } else {
      // Otherwise, assign the current rank
      bracket.rankData.rank = index + 1;
    }
  });

  // Step 4: Copy ranks back to the original array
  dataArray.forEach(bracket => {
    const matchedBracket = sortedData.find(b => b.id === bracket.id);
    bracket.rankData.rank = matchedBracket.rankData.rank;
  });

  return dataArray;
}

async function run() {
  // Winners bracket
  const winnersBracketResponse = await airtableBase('User Brackets').find(
    'rec8rfwZm4QLY5TXg'
  );
  const winnersFields = transformFields({ record: winnersBracketResponse });

  const allLeagues = await airtableBase('Leagues').select().all();
  for (let league of allLeagues) {
    const leagueId = league.getId();
    const leagueFields = transformFields({ record: league });
    const brackets = leagueFields.userBrackets;
    if (brackets) {
      const bracketsWithData = await Promise.all(
        brackets.map(async bracketId => {
          const bracket = await airtableBase('User Brackets').find(bracketId);
          const bracketFields = transformFields({ record: bracket });
          const entries = Object.entries(bracketFields);
          const Duels = {
            name: 'Duels',
            subBracket: "Men's",
            correctPicks: 0,
            numberOfWinners: 0,
            totalPoints: 0,
          };
          const DuelsWomen = {
            name: 'DuelsWomen',
            subBracket: "Women's",
            correctPicks: 0,
            numberOfWinners: 0,
            totalPoints: 0,
          };
          const Revelstoke = {
            name: 'Revelstoke',
            subBracket: "Men's",
            correctPicks: 0,
            numberOfWinners: 0,
            totalPoints: 0,
          };
          const RevelstokeWomen = {
            name: 'RevelstokeWomen',
            subBracket: "Women's",
            correctPicks: 0,
            numberOfWinners: 0,
            totalPoints: 0,
          };
          const Selkirk = {
            name: 'Selkirk',
            subBracket: "Men's",
            correctPicks: 0,
            numberOfWinners: 0,
            totalPoints: 0,
          };
          const SelkirkWomen = {
            name: 'SelkirkWomen',
            subBracket: "Women's",
            correctPicks: 0,
            numberOfWinners: 0,
            totalPoints: 0,
          };
          const formatted = entries.reduce((acc, curr) => {
            const roundNumber = curr[0].split('_')[1];
            const points = mapRoundToPoints[roundNumber];
            if (curr[0].includes('d_')) {
              const round = curr[0].split('_')[1];
              const matchup = curr[0].split('_')[2];
              const matchupId = `${round}_${matchup}`;
              Duels[matchupId] = curr[1];
              if (Duels[matchupId] === winnersFields[curr[0]]) {
                Duels.correctPicks++;
                Duels.totalPoints += points;
              }
              if (winnersFields[curr[0]]) {
                Duels.numberOfWinners++;
              }
            }
            if (curr[0].includes('dW_')) {
              const round = curr[0].split('_')[1];
              const matchup = curr[0].split('_')[2];
              const matchupId = `${round}_${matchup}`;
              DuelsWomen[matchupId] = curr[1];
              if (DuelsWomen[matchupId] === winnersFields[curr[0]]) {
                DuelsWomen.correctPicks++;
                DuelsWomen.totalPoints += points;
              }
              if (winnersFields[curr[0]]) {
                DuelsWomen.numberOfWinners++;
              }
            }
            if (curr[0].includes('r_')) {
              const round = curr[0].split('_')[1];
              const matchup = curr[0].split('_')[2];
              const matchupId = `${round}_${matchup}`;
              Revelstoke[matchupId] = curr[1];
              if (Revelstoke[matchupId] === winnersFields[curr[0]]) {
                Revelstoke.correctPicks++;
                Revelstoke.totalPoints += points;
              }
              if (winnersFields[curr[0]]) {
                Revelstoke.numberOfWinners++;
              }
            }
            if (curr[0].includes('rW_')) {
              const round = curr[0].split('_')[1];
              const matchup = curr[0].split('_')[2];
              const matchupId = `${round}_${matchup}`;
              RevelstokeWomen[matchupId] = curr[1];
              if (RevelstokeWomen[matchupId] === winnersFields[curr[0]]) {
                RevelstokeWomen.correctPicks++;
                RevelstokeWomen.totalPoints += points;
              }
              if (winnersFields[curr[0]]) {
                RevelstokeWomen.numberOfWinners++;
              }
            }
            if (curr[0].includes('s_')) {
              const round = curr[0].split('_')[1];
              const matchup = curr[0].split('_')[2];
              const matchupId = `${round}_${matchup}`;
              Selkirk[matchupId] = curr[1];
              if (Selkirk[matchupId] === winnersFields[curr[0]]) {
                Selkirk.correctPicks++;
                Selkirk.totalPoints += points;
              }
              if (winnersFields[curr[0]]) {
                Selkirk.numberOfWinners++;
              }
            }
            if (curr[0].includes('sW_')) {
              const round = curr[0].split('_')[1];
              const matchup = curr[0].split('_')[2];
              const matchupId = `${round}_${matchup}`;
              SelkirkWomen[matchupId] = curr[1];
              if (SelkirkWomen[matchupId] === winnersFields[curr[0]]) {
                SelkirkWomen.correctPicks++;
                SelkirkWomen.totalPoints += points;
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

          const object = {
            bracketName: bracketFields.name,
            id: bracket.id,
            selections,
          };
          return object;
        })
      );

      const rankedTeams = calculateRanks(bracketsWithData);
      console.log(leagueId);
      const json = JSON.stringify(rankedTeams);

      try {
        const response = await airtableBase('Leagues').update([
          {
            id: leagueId,
            fields: { json },
          },
        ]);
      } catch (error) {
        console.log('error updating:', leagueId, error);
      }
    }
  }
}

run();
