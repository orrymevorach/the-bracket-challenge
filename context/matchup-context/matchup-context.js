import useSetInitialMatchups from './useSetInitialMatchups';
import { addWinnerToMatchups } from './matchup-utils';
import useApplyLiveResults from './useApplyLiveResults';
import { useRouter } from 'next/router';

const { createContext, useContext, useState } = require('react');
const MatchupContext = createContext();

export const useMatchups = () => {
  return useContext(MatchupContext);
};

export const MatchupDataProvider = ({ children, currentRound }) => {
  const [matchups, setMatchups] = useState([]);
  const router = useRouter();
  const bracketId = router.query.bracketId;
  useSetInitialMatchups({ setMatchups, currentRound, bracketId });

  const setWinner = ({ player, matchups, matchupId }) => {
    const updatedMatchups = addWinnerToMatchups({
      player,
      matchups,
      matchupId,
    });
    setMatchups(updatedMatchups);
  };

  useApplyLiveResults({ matchups, setMatchups, currentRound });

  const value = {
    matchups,
    setWinner,
  };

  return (
    <MatchupContext.Provider value={value}>{children}</MatchupContext.Provider>
  );
};
