import { useMatchups } from '@/context/matchup-context/matchup-context';
import styles from './ProgressBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import useWindowSize from '@/hooks/useWindowSize';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { COLORS, ROUTES } from '@/utils/constants';
import Link from 'next/link';

const getProgressBarData = contests => {
  let numberOfMatchups = 0;
  let numberOfSelectedWinners = 0;
  for (let contest of contests) {
    if (contest.enableSelections === 'False') continue;
    if (contest.questions) {
      for (let question of contest.questions) {
        numberOfMatchups++;
        if (question.selectedWinner) numberOfSelectedWinners++;
        continue;
      }
    }
    if (contest.matchups) {
      for (let matchup of contest.matchups) {
        if (contest.display !== 'regular' && matchup.round > 1) continue;
        numberOfMatchups++;
        if (matchup.winner) numberOfSelectedWinners++;
        continue;
      }
    }
  }

  return {
    numberOfMatchups,
    numberOfSelectedWinners,
  };
};

const getIsCurrentRoundPicksComplete = currentContest => {
  if (!currentContest.matchups) return false;
  let totalNumberOfPlayers = currentContest.matchups.length * 2;
  let numberOfSelectedPlayers = 0;

  for (let matchup of currentContest.matchups) {
    if (matchup.team1) numberOfSelectedPlayers++;
    if (matchup.team2) numberOfSelectedPlayers++;
  }
  return totalNumberOfPlayers === numberOfSelectedPlayers;
};

export default function ProgressBar() {
  const { isMobile } = useWindowSize();
  const { contests, currentRoundIndex, setCurrentRoundIndex, currentContest } =
    useMatchups();

  const isCurrentRoundPicksComplete =
    getIsCurrentRoundPicksComplete(currentContest);

  // used for sticky behavior
  const componentRef = useRef(null);
  const placeholderRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  // sticky behavior when window scrolls past component
  useEffect(() => {
    const handleScroll = () => {
      if (placeholderRef.current && componentRef.current) {
        const placeholderTop =
          placeholderRef.current.getBoundingClientRect().top;

        // Check if the placeholder is visible in the viewport
        setIsSticky(placeholderTop <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { numberOfMatchups, numberOfSelectedWinners } =
    getProgressBarData(contests);

  const handleClickPrevious = () => {
    if (currentRoundIndex <= 0) return;
    setCurrentRoundIndex(currentRoundIndex - 1);
  };

  const handleClickNext = () => {
    if (currentRoundIndex === contests.length - 1) return;
    setCurrentRoundIndex(currentRoundIndex + 1);
  };

  const progress = (numberOfSelectedWinners / numberOfMatchups) * 100;
  const progressBarColor = contests[0].textStrokeColor || contests[0].color;
  const backgroundColor = contests[0].textStrokeColor
    ? contests[0].color
    : '#f3f3f3';

  const isAllRoundSelectionsComplete = progress === 100;

  return (
    <>
      <div
        ref={placeholderRef}
        style={{ height: isSticky ? componentRef.current?.offsetHeight : 0 }}
      />

      <div
        className={clsx(styles.container, isSticky && styles.sticky)}
        ref={componentRef}
      >
        <div className={styles.topRow}>
          {currentRoundIndex > 0 ? (
            <button className={styles.previous} onClick={handleClickPrevious}>
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                size={isMobile ? '2x' : 'lg'}
              />{' '}
              {!isMobile && 'Previous bracket'}
            </button>
          ) : (
            <div />
          )}

          <p className={styles.progressText}>
            {numberOfSelectedWinners} / {numberOfMatchups}
            <span> picks complete</span>
          </p>
          {currentRoundIndex < contests.length - 1 ? (
            <button
              className={clsx(
                styles.next,
                isCurrentRoundPicksComplete && !isAllRoundSelectionsComplete
                  ? styles.glow
                  : ''
              )}
              onClick={handleClickNext}
            >
              {!isMobile && 'Next bracket'}{' '}
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                size={isMobile ? '2x' : 'lg'}
              />
            </button>
          ) : (
            <div />
          )}
        </div>

        <div
          className={styles.progressBarContainer}
          style={{
            backgroundColor,
            border: isAllRoundSelectionsComplete
              ? `2px solid ${COLORS.GREEN}`
              : `2px solid ${progressBarColor}`,
          }}
        >
          <div
            className={styles.progressBar}
            style={{
              width: `${progress}%`,
              backgroundColor: isAllRoundSelectionsComplete
                ? COLORS.GREEN
                : progressBarColor,
            }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        {isAllRoundSelectionsComplete && isMobile && (
          <div className={styles.completeContainer}>
            <Link href={ROUTES.DASHBOARD}>
              <FontAwesomeIcon icon={faCircleLeft} size="lg" /> Dashboard
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
