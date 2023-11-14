import { createContext, useContext, useEffect, useState } from 'react';
import useGetSnowboarders from '../matchup-context/useGetSnowboarders';

const SnowboardersContext = createContext();

export const useSnowboarders = () => {
  return useContext(SnowboardersContext);
};

export const SnowboardersProvider = ({ children }) => {
  const snowboarders = useGetSnowboarders();

  return (
    <SnowboardersContext.Provider value={snowboarders}>
      {children}
    </SnowboardersContext.Provider>
  );
};
