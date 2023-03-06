import useSetMatchupSelections from './useSetMatchupSelections';
import { useSetInitialMatchups } from './useSetInitialMatchups';
import useGetSavedSelections from './useGetSavedSelections';
import useGetSnowboarders from './useGetSnowboarders';
import useApplyLiveResults from './useApplyLiveResults';

const { createContext, useContext } = require('react');

const MatchupContext = createContext();

export const useMatchups = () => {
  return useContext(MatchupContext);
};

export const MatchupDataProvider = ({ children }) => {
  const snowboarders = useGetSnowboarders();
  const matchupData = useSetMatchupSelections();
  useSetInitialMatchups({
    dispatch: matchupData.dispatch,
    snowboarders,
    allMatchups: matchupData.allMatchups,
  });

  useGetSavedSelections({ matchupData });
  useApplyLiveResults({ matchupData });

  return (
    <MatchupContext.Provider value={matchupData}>
      {children}
    </MatchupContext.Provider>
  );
};
