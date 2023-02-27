export const transformMatchupsObjectIntoArray = data => {
  const dataIntoArray = Object.entries(data);
  return dataIntoArray.map(matchup => {
    const [matchupId, { snowboarders, winner }] = matchup;
    return {
      matchupId,
      snowboarders,
      winner,
    };
  });
};

export const transformMatchupsArrayToObject = data => {
  return data.reduce((acc, curr) => {
    const matchup = {
      snowboarders: curr.snowboarders,
      winner: curr.winner,
    };
    acc[curr.matchupId] = matchup;
    return acc;
  }, {});
};
