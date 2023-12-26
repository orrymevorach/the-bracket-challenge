import { addWinnerToMatchups } from './matchup-utils';
import { useRouter } from 'next/router';
import useSetMatchups from './useSetMatchups';

const { createContext, useContext, useState } = require('react');
const MatchupContext = createContext();

export const useMatchups = () => {
  return useContext(MatchupContext);
};

export const MatchupDataProvider = ({ children, currentRound }) => {
  const [matchups, setMatchups] = useState([]);
  const router = useRouter();
  const bracketId = router.query.bracketId;
  useSetMatchups({ setMatchups, currentRound, bracketId });

  const setWinner = ({ player, matchups, matchupId }) => {
    const updatedMatchups = addWinnerToMatchups({
      player,
      matchups,
      matchupId,
    });
    setMatchups(updatedMatchups);
  };

  const value = {
    matchups,
    setWinner,
  };

  return (
    <MatchupContext.Provider value={value}>{children}</MatchupContext.Provider>
  );
};
