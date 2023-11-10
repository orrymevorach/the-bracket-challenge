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
  const currentUserBracket = leagueWithRankings.find(
    team => team.bracketName === bracketName
  );
  return currentUserBracket?.ranking || '';
};

function countNumberOfWinnersInEachRound({ winnersData }) {
  let overallWinners = 0;
  let duelsWinners = 0;
  let revelstokeWinners = 0;

  for (const key in winnersData) {
    if (
      winnersData.hasOwnProperty(key) &&
      Array.isArray(winnersData[key]) &&
      winnersData[key].length > 0
    ) {
      if (key.includes('dR')) {
        duelsWinners++;
      } else if (key.includes('rR')) {
        revelstokeWinners++;
      }
      overallWinners++;
    }
  }

  return {
    Duels: duelsWinners,
    Revelstoke: revelstokeWinners,
    Overall: overallWinners,
  };
}

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

export function addNumberOfCorrectPicksToRoundData({
  bracketData,
  winnersData,
}) {
  const numberOfWinnersInRound = countNumberOfWinnersInEachRound({
    winnersData,
  });
  for (const key in bracketData) {
    const numberOfCorrectPicks = countNumberOfCorrectPicks({
      bracketData: bracketData[key],
      winners: winnersData,
    });
    bracketData[key].numberOfCorrectPicks = numberOfCorrectPicks;
    bracketData[key].numberOfWinnersInRound = numberOfWinnersInRound[key];
  }
}

export function sortSelectionsIntoRounds(winnersData) {
  const duelsWinners = {};
  const revelstokeWinners = {};
  const overallWinners = {};

  // Iterate through the each winner in the winners object and sort it into a round based on the key
  for (const key in winnersData) {
    if (key.startsWith('dR')) {
      duelsWinners[key] = winnersData[key];
    } else if (key.startsWith('rR')) {
      revelstokeWinners[key] = winnersData[key];
    }
    overallWinners[key] = winnersData[key];
  }

  const resultObject = {
    Duels: duelsWinners,
    Revelstoke: revelstokeWinners,
    Overall: overallWinners,
  };

  return resultObject;
}
