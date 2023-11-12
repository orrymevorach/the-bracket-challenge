import { createContext, useContext, useEffect, useState } from 'react';
import useGetLeagueConfig from '@/components/league/useGetLeagueConfig';

const LeagueConfigContext = createContext();

export const useLeagueConfig = () => {
  return useContext(LeagueConfigContext);
};

export const LeagueConfigProvider = ({ children }) => {
  const leagueConfig = useGetLeagueConfig();

  return (
    <LeagueConfigContext.Provider value={leagueConfig}>
      {children}
    </LeagueConfigContext.Provider>
  );
};
