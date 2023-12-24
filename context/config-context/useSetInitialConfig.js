import { useEffect } from 'react';
import { useConfig } from './config-context';
import { ROUND_NAMES } from '@/utils/constants';

export const useSetInitialConfig = config => {
  const { setConfig } = useConfig();
  const {
    isDuelsSelectionsEnabled,
    isRevelstokedSelectionsEnabled,
    isSelkirkSelectionsEnabled,
    currentRound,
    showDuelsMatchups,
    showRevelstokeMatchups,
    showSelkirkMatchups,
  } = config;

  useEffect(() => {
    let isSelectionsEnabled = config.isSelectionsEnabled;
    let showMatchups = config.showMatchups;
    if (
      (currentRound === ROUND_NAMES.DUELS && isDuelsSelectionsEnabled) ||
      (currentRound === ROUND_NAMES.REVELSTOKE &&
        isRevelstokedSelectionsEnabled) ||
      (currentRound === ROUND_NAMES.SELKIRK && isSelkirkSelectionsEnabled)
    ) {
      isSelectionsEnabled = true;
    } else {
      isSelectionsEnabled = false;
    }

    if (
      (currentRound === ROUND_NAMES.DUELS && showDuelsMatchups) ||
      (currentRound === ROUND_NAMES.REVELSTOKE && showRevelstokeMatchups) ||
      (currentRound === ROUND_NAMES.SELKIRK && showSelkirkMatchups)
    ) {
      showMatchups = true;
    } else {
      showMatchups = false;
    }

    setConfig({
      ...config,
      isSelectionsEnabled,
      showMatchups,
    });

    // Intentionally leaving out some of the dependencies to avoid unlimited re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound]);
};
