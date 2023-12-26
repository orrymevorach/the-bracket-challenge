import { getSnowboarders } from '@/lib/airtable';
import { ROUND_SUFFIXES } from '@/utils/constants';

export const sortSnowboardersByRound = ({ snowboarders }) => {
  let Duels = [];
  let DuelsWomen = [];
  let Revelstoke = [];
  let RevelstokeWomen = [];
  let Selkirk = [];
  let SelkirkWomen = [];

  for (let snowboarder of snowboarders) {
    if (
      snowboarder.duelsMatchupId &&
      snowboarder.duelsMatchupId.includes(ROUND_SUFFIXES.Duels)
    ) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.duelsMatchupId.replace(
        ROUND_SUFFIXES.Duels,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      Duels.push(snowboarderCopy);
    }
    if (
      snowboarder.duelsMatchupId &&
      snowboarder.duelsMatchupId.includes(ROUND_SUFFIXES.DuelsWomen)
    ) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.duelsMatchupId.replace(
        ROUND_SUFFIXES.DuelsWomen,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      DuelsWomen.push(snowboarderCopy);
    }
    if (
      snowboarder.revelstokeMatchupId &&
      snowboarder.revelstokeMatchupId.includes(ROUND_SUFFIXES.Revelstoke)
    ) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.revelstokeMatchupId.replace(
        ROUND_SUFFIXES.Revelstoke,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      Revelstoke.push(snowboarderCopy);
    }
    if (
      snowboarder.revelstokeMatchupId &&
      snowboarder.revelstokeMatchupId.includes(ROUND_SUFFIXES.RevelstokeWomen)
    ) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.revelstokeMatchupId.replace(
        ROUND_SUFFIXES.RevelstokeWomen,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      RevelstokeWomen.push(snowboarderCopy);
    }
    if (
      snowboarder.selkirkMatchupId &&
      snowboarder.selkirkMatchupId.includes(ROUND_SUFFIXES.Selkirk)
    ) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.selkirkMatchupId.replace(
        ROUND_SUFFIXES.Selkirk,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      Selkirk.push(snowboarderCopy);
    }
    if (
      snowboarder.selkirkMatchupId &&
      snowboarder.selkirkMatchupId.includes(ROUND_SUFFIXES.SelkirkWomen)
    ) {
      // Renaming field to make it generic
      const snowboarderCopy = { ...snowboarder };
      const matchupId = snowboarder.selkirkMatchupId.replace(
        ROUND_SUFFIXES.SelkirkWomen,
        ''
      );
      snowboarderCopy.matchupId = matchupId;
      SelkirkWomen.push(snowboarderCopy);
    }
  }
  return {
    Duels,
    DuelsWomen,
    Revelstoke,
    RevelstokeWomen,
    Selkirk,
    SelkirkWomen,
  };
};

const mapRoundNameToMatchupIdKey = {
  Duels: 'duelsMatchupId',
  DuelsWomen: 'duelsMatchupId',
  Revelstoke: 'revelstokeMatchupId',
  RevelstokeWomen: 'revelstokeMatchupId',
  Selkirk: 'selkirkMatchupId',
  SelkirkWomen: 'selkirkMatchupId',
};

const createMatchups = (snowboarders = [], currentRound = '') => {
  // Get matchup key for each round based on current round name
  const matchupIdKey = mapRoundNameToMatchupIdKey[currentRound];
  // Filter out the snowboarders not in the current round
  const filteredSnowboarders = snowboarders.filter(snowboarder => {
    return !!snowboarder[matchupIdKey];
  });

  // Create an object, where each child object has a key with the current matchup ID, and the value has the matchup data
  const roundSuffix = ROUND_SUFFIXES[currentRound];
  const groupedData = {};
  for (let snowboarder of filteredSnowboarders) {
    const matchupId = snowboarder[matchupIdKey];
    const key = matchupId.replace(roundSuffix, '');
    const round = parseFloat(matchupId.split('_R')[1].split('_M')[0]);
    const position = parseFloat(matchupId.split('_M')[1]);
    if (!groupedData[key]) {
      groupedData[key] = {
        round,
        position,
        matchupId: key,
        team1: snowboarder,
      };
    } else {
      groupedData[key].team2 = snowboarder;
    }
  }

  // Convert the matchup object into an array of all the matchups
  const matchups = Object.values(groupedData);

  // Create placeholders for subsequent rounds
  const totalRounds = Math.ceil(Math.log2(filteredSnowboarders.length));
  for (let round = 2; round <= totalRounds; round++) {
    const roundMatchups = [];

    // Determine the number of matchups in the current round
    const numMatchups = Math.pow(2, totalRounds - round);

    for (let position = 1; position <= numMatchups; position++) {
      roundMatchups.push({
        round,
        position,
        team1: null,
        team2: null,
        winner: null,
        matchupId: `R${round}_M${position}`,
      });
    }

    matchups.push(...roundMatchups);
  }

  return matchups;
};

export default async function handler(req, res) {
  const { currentRound } = req.body;

  const { snowboarders } = await getSnowboarders();
  const snowboardersSortedByRound = sortSnowboardersByRound({
    snowboarders,
  });
  const snowboardersInCurrentRound = snowboardersSortedByRound[currentRound];
  const firstRoundMatchups = createMatchups(
    snowboardersInCurrentRound,
    currentRound
  );

  res.status(200).json({ firstRoundMatchups });
}
