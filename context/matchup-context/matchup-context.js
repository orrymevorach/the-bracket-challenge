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
  const revelstokeMatchupData = useSetMatchupSelections();
  useSetInitialMatchups({
    dispatch: revelstokeMatchupData.dispatch,
    snowboarders,
  });

  // useGetSavedSelections({ matchupData });
  // useApplyLiveResults({ matchupData });

  return (
    <MatchupContext.Provider value={revelstokeMatchupData}>
      {children}
    </MatchupContext.Provider>
  );
};
