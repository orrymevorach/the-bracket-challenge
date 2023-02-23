import { useMatchupData } from 'hooks';

const { createContext } = require('react');

export const MatchupContext = createContext();

export const MatchupDataProvider = ({ children }) => {
  const matchupData = useMatchupData();
  return (
    <MatchupContext.Provider value={matchupData}>
      {children}
    </MatchupContext.Provider>
  );
};
