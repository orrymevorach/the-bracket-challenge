import useSetInitialMatchups from './useSetInitialMatchups';
import { addWinnerToMatchups } from './matchup-utils';
import useAddUserSelectionsToRounds from './useAddUserSelectionsToRounds';
import useApplyLiveResults from './useApplyLiveResults';

const { createContext, useContext, useState } = require('react');
const MatchupContext = createContext();

export const useMatchups = () => {
  return useContext(MatchupContext);
};

export const MatchupDataProvider = ({
  children,
  currentRound,
  userBracketSelections,
}) => {
  const [matchups, setMatchups] = useState([]);
  useSetInitialMatchups({ setMatchups, currentRound });

  const setWinner = ({ player, matchups, matchupId }) => {
    const updatedMatchups = addWinnerToMatchups({
      player,
      matchups,
      matchupId,
    });
    setMatchups(updatedMatchups);
  };

  useAddUserSelectionsToRounds({
    matchups,
    userBracketSelections,
    setMatchups,
  });

  useApplyLiveResults({ matchups, setMatchups, currentRound });

  const value = {
    matchups,
    setWinner,
  };

  return (
    <MatchupContext.Provider value={value}>{children}</MatchupContext.Provider>
  );
};
