export const countNumberOfCorrectPicks = ({ bracketData, winners }) => {
  if (!bracketData || !winners) return;
  let count = 0;

  for (const key in bracketData) {
    if (
      bracketData.hasOwnProperty(key) &&
      winners.hasOwnProperty(key) &&
      bracketData[key][0]?.name !== undefined &&
      bracketData[key][0]?.name === winners[key][0]?.name
    ) {
      count++;
    }
  }

  return count;
};

function addRankingsToObjects({ inputArray = [] }) {
  if (inputArray.length === 0) return [];

  const rankedObjects = inputArray.map(obj => {
    const ranking = (
      inputArray.filter(
        otherObj => otherObj.numberOfCorrectPicks > obj.numberOfCorrectPicks
      ).length + 1
    ).toString();
    const tiedRankings = inputArray.filter(
      otherObj => otherObj.numberOfCorrectPicks === obj.numberOfCorrectPicks
    );

    if (tiedRankings.length > 1) {
      return { ...obj, ranking: `T-${ranking}` };
    } else {
      return { ...obj, ranking };
    }
  });

  return rankedObjects;
}

export const getRanking = ({ leagueData, bracketName, winnersData }) => {
  const usersWithNumberOfCorrectPicks = leagueData.brackets.map(team => {
    const numberOfCorrectPicks = countNumberOfCorrectPicks({
      bracketData: team,
      winners: winnersData,
    });
    return {
      numberOfCorrectPicks,
      bracketName: team.name,
    };
  });
  const leagueWithRankings = addRankingsToObjects({
    inputArray: usersWithNumberOfCorrectPicks,
  });
  const currentUserRanking = leagueWithRankings.find(
    team => team.bracketName === bracketName
  ).ranking;
  return currentUserRanking;
};

export function countNumberOfWinners({ winners }) {
  let count = 0;

  for (const key in winners) {
    if (
      winners.hasOwnProperty(key) &&
      Array.isArray(winners[key]) &&
      winners[key].length > 0
    ) {
      count++;
    }
  }

  return count;
}

// export function sortWinnersIntoRounds(winnersObject) {
//   // Check if the input is an array with at least one element
//   if (typeof winnersObject !== 'object' || winnersObject === null) {
//     return {};
//   }

//   const duelsWinners = {};
//   const revelstokeWinners = {};

//   // Iterate through the keys of the duelsWinners
//   for (const key in winnersObject) {
//     // Check if the key starts with "dR1"
//     if (key.startsWith('dR')) {
//       const newKey = key.replace('dR', 'r');
//       duelsWinners[newKey] = winnersObject[key];
//     } else if (key.startsWith('rR')) {
//       const newKey = key.replace('rR', 'r');
//       revelstokeWinners[newKey] = winnersObject[key];
//     }
//   }
//   // Create the final object with the "Duels" key and the duelsObject
//   const resultObject = { Duels: duelsWinners, Revelstoke: revelstokeWinners };

//   // Return the final result
//   return resultObject;
// }
