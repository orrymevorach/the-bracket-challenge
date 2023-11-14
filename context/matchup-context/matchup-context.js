import useSetMatchupSelections from './useSetMatchupSelections';
import { useSetInitialMatchups } from './useSetInitialMatchups';
// import useGetSavedSelections from './useGetSavedSelections';
// import useApplyLiveResults from './useApplyLiveResults';

const { createContext, useContext } = require('react');

const MatchupContext = createContext();

export const useMatchups = () => {
  return useContext(MatchupContext);
};

export const MatchupDataProvider = ({ snowboarders, children }) => {
  const matchupData = useSetMatchupSelections();
  useSetInitialMatchups({
    dispatch: matchupData.dispatch,
    snowboarders,
  });

  // useGetSavedSelections({ matchupData });
  // useApplyLiveResults({ matchupData });

  return (
    <MatchupContext.Provider value={matchupData}>
      {children}
    </MatchupContext.Provider>
  );
};
