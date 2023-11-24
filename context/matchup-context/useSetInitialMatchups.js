import { ROUND_SUFFIXES } from '@/utils/constants';
import { useEffect } from 'react';

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

export default function useSetInitialMatchups({
  setMatchups,
  snowboarders,
  currentRound,
}) {
  useEffect(() => {
    if (snowboarders?.length) {
      const firstRoundMatchups = createMatchups(snowboarders, currentRound);
      setMatchups(firstRoundMatchups);
    }
  }, [snowboarders, setMatchups, currentRound]);
}
