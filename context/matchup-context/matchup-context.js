import { addWinnerToMatchups } from './matchup-utils';
import { useRouter } from 'next/router';
import useSetMatchups from './useSetMatchups';

const { createContext, useContext, useState } = require('react');
const MatchupContext = createContext();

export const useMatchups = () => {
  return useContext(MatchupContext);
};

export const MatchupDataProvider = ({ children }) => {
  const [matchups, setMatchups] = useState([]);
  const router = useRouter();
  const bracketId = router.query.bracketId;
  const { snowboarders } = useSetMatchups({ setMatchups, bracketId });

  const setWinner = ({ player, matchupId, currentRound }) => {
    const updatedRoundMatchups = addWinnerToMatchups({
      player,
      matchups: matchups[currentRound],
      matchupId,
    });

    // Making a copy so that state gets updated and creates a refresh
    const matchupsCopy = { ...matchups };
    matchupsCopy[currentRound] = updatedRoundMatchups;

    setMatchups(matchupsCopy);
  };

  const value = {
    matchups,
    setWinner,
    snowboarders,
  };

  return (
    <MatchupContext.Provider value={value}>{children}</MatchupContext.Provider>
  );
};
