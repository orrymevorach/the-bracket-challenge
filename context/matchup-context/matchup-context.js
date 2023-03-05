import { useState, useEffect } from 'react';
import useSetMatchupSelections from './useSetMatchupSelections';
import { useSetInitialMatchups } from './useSetInitialMatchups';
import { getSnowboarders } from '../../airtable-utils';

const { createContext, useContext } = require('react');

const MatchupContext = createContext();

export const useMatchups = () => {
  return useContext(MatchupContext);
};

const useGetSnowboarders = () => {
  const [snowboarders, setSnowboarders] = useState([]);
  useEffect(() => {
    const getSnowboardersData = async () => {
      const data = await getSnowboarders();
      setSnowboarders(data.snowboarders);
    };
    getSnowboardersData();
  }, []);
  return snowboarders;
};

export const MatchupDataProvider = ({ children }) => {
  const snowboarders = useGetSnowboarders();
  const matchupData = useSetMatchupSelections();
  useSetInitialMatchups({ dispatch: matchupData.dispatch, snowboarders });
  const value = {
    ...matchupData,
    snowboarders,
  };
  return (
    <MatchupContext.Provider value={value}>{children}</MatchupContext.Provider>
  );
};
