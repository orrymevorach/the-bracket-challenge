export const orderSnowboardersByRound = ({ snowboarders }) => {
  if (!snowboarders) return [];
  return [
    snowboarders.r1M1[0].name,
    snowboarders.r1M2[0].name,
    snowboarders.r1M3[0].name,
    snowboarders.r1M4[0].name,
    snowboarders.r1M5[0].name,
    snowboarders.r1M6[0].name,
    snowboarders.r1M7[0].name,
    snowboarders.r1M8[0].name,
  ];
};

export const countWinners = ({ bracketData, winners }) => {
  if (!winners || !bracketData) return;
  const userPicks = orderSnowboardersByRound({ snowboarders: bracketData });
  return userPicks.reduce((acc, curr, index) => {
    if (curr === winners[index]) return acc + 1;
    return acc;
  }, 0);
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

export const getRanking = ({ leagueData, winners, bracketName }) => {
  const usersWithNumberOfCorrectPicks = leagueData.brackets.map(team => {
    const numberOfCorrectPicks = countWinners({ bracketData: team, winners });
    return {
      userName: team.userName[0],
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
