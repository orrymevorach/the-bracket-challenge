import { getWinners } from '@/lib/airtable';
import { createContext, useContext, useEffect, useState } from 'react';

const WinnersContext = createContext();

export const useWinners = () => {
  return useContext(WinnersContext);
};

export const WinnersProvider = ({ children }) => {
  const [winners, setWinners] = useState();
  useEffect(() => {
    const getWinnersData = async () => {
      const winnersData = await getWinners({ name: 'Mens Winners' });
      setWinners(winnersData);
    };
    getWinnersData();
  }, []);
  return (
    <WinnersContext.Provider value={winners}>
      {children}
    </WinnersContext.Provider>
  );
};
