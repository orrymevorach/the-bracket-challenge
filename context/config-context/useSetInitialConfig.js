import { useEffect } from 'react';
import { useConfig } from './config-context';
import { ROUND_NAMES } from '@/utils/constants';
import useGetCurrentUserBracket from './useGetCurrentUserBracket';

export const useSetInitialConfig = config => {
  const { setConfig } = useConfig();
  const {
    isDuelsSelectionsEnabled,
    isRevelstokeSelectionsEnabled,
    isSelkirkSelectionsEnabled,
    currentRound,
    showDuelsMatchups,
    showRevelstokeMatchups,
    showSelkirkMatchups,
  } = config;

  const isCurrentUsersBracket = useGetCurrentUserBracket();

  useEffect(() => {
    let isSelectionsEnabled = config.isSelectionsEnabled;
    let showMatchups = config.showMatchups;
    let isLoading = config.isLoading;

    // enable/disable the ability to select a winner of a bracket based on feature flags from contentful
    if (isCurrentUsersBracket) {
      if (
        (currentRound === ROUND_NAMES.DUELS && isDuelsSelectionsEnabled) ||
        (currentRound === ROUND_NAMES.REVELSTOKE &&
          isRevelstokeSelectionsEnabled) ||
        (currentRound === ROUND_NAMES.SELKIRK && isSelkirkSelectionsEnabled)
      ) {
        isSelectionsEnabled = true;
        isLoading = false;
      } else {
        isSelectionsEnabled = false;
        isLoading = false;
      }
    } else {
      isSelectionsEnabled = false;
    }

    // enable/disable the ability to view the bracket based on feature flags from contentful
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
      isLoading,
    });

    // Intentionally leaving out some of the dependencies to avoid unlimited re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound, isCurrentUsersBracket]);
};
