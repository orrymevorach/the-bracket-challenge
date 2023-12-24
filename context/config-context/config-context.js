import { ROUND_NAMES } from '@/utils/constants';
import { createContext, useContext, useState, useEffect } from 'react';

const ConfigContext = createContext();

export const useConfig = () => {
  return useContext(ConfigContext);
};

export const ConfigProvider = ({ children }) => {
  const initialConfig = {
    currentRound: ROUND_NAMES.DUELS,
    showMatchups: false,
    isSelectionsEnabled: false,
  };
  const [config, setConfig] = useState(initialConfig);
  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
