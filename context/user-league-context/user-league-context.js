import { createContext, useContext, useEffect, useState } from 'react';
import useGetUserLeagueData from '@/components/dashboard/useGetUserLeagueData';

const UserLeagueContext = createContext();

export const useUserLeague = () => {
  return useContext(UserLeagueContext);
};

export const UserLeagueProvider = ({ children }) => {
  const userLeagueData = useGetUserLeagueData();

  return (
    <UserLeagueContext.Provider value={userLeagueData}>
      {children}
    </UserLeagueContext.Provider>
  );
};
