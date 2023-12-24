import { useEffect, useState } from 'react';
import { useConfig } from './config-context';
import { ROUND_NAMES } from '@/utils/constants';

export const useSetInitialConfig = config => {
  const [isSelectionsEnabled, setIsSelectionsEnabled] = useState(false);
  const { setConfig } = useConfig();
  const {
    isDuelsSelectionsEnabled,
    isRevelstokedSelectionsEnabled,
    isSelkirkSelectionsEnabled,
    currentRound,
  } = config;

  useEffect(() => {
    if (currentRound === ROUND_NAMES.DUELS && isDuelsSelectionsEnabled) {
      setIsSelectionsEnabled(true);
    }
    if (
      currentRound === ROUND_NAMES.REVELSTOKE &&
      isRevelstokedSelectionsEnabled
    ) {
      setIsSelectionsEnabled(true);
    }
    if (currentRound === ROUND_NAMES.SELKIRK && isSelkirkSelectionsEnabled) {
      setIsSelectionsEnabled(true);
    }
    setConfig({
      ...config,
      isSelectionsEnabled,
    });
  }, [
    // Intentionally leaving out some of the dependencies to avoid unlimited re-renders
    currentRound,
    isDuelsSelectionsEnabled,
    isRevelstokedSelectionsEnabled,
    isSelkirkSelectionsEnabled,
    setConfig,
  ]);
};
