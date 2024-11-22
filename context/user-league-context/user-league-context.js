import { createContext, useContext } from 'react';

const UserLeagueContext = createContext();

export const useUserLeague = () => {
  return useContext(UserLeagueContext);
};

export const UserLeagueProvider = ({ children, userLeagueData }) => {
  return (
    <UserLeagueContext.Provider value={userLeagueData}>
      {children}
    </UserLeagueContext.Provider>
  );
};
