import useSetRoundProgressions from './useSetRoundProgressions';
import { useSetInitialMatchups } from './useSetInitialMatchups';
import useAddUserSelectionsToRounds from './useAddUserSelectionsToRounds';
// import useApplyLiveResults from './useApplyLiveResults';

const { createContext, useContext } = require('react');

const MatchupContext = createContext();

export const useMatchups = () => {
  return useContext(MatchupContext);
};

export const MatchupDataProvider = ({
  snowboarders,
  children,
  winners,
  userBracketSelections,
}) => {
  const matchupData = useSetRoundProgressions();
  useSetInitialMatchups({
    dispatch: matchupData.dispatch,
    snowboarders,
  });

  useAddUserSelectionsToRounds({ matchupData, userBracketSelections });
  // useApplyLiveResults({ matchupData });

  return (
    <MatchupContext.Provider value={matchupData}>
      {children}
    </MatchupContext.Provider>
  );
};
