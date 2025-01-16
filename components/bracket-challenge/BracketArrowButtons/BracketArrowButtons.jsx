import { useMatchups } from '@/context/matchup-context/matchup-context';
import styles from './BracketArrowButtons.module.scss';
import ArrowButton, {
  getIsCurrentRoundPicksComplete,
} from '@/components/bracket-challenge/ProgressBar/ArrowButton/ArrowButton';
import clsx from 'clsx';
import useWindowSize from '@/hooks/useWindowSize';

export default function BracketArrowButtons({ children }) {
  const { isMobile } = useWindowSize();
  const { contests, currentRoundIndex, currentContest } = useMatchups();

  if (isMobile) return children;
  const isCurrentRoundPicksComplete =
    getIsCurrentRoundPicksComplete(currentContest);
  return (
    <>
      {currentRoundIndex > 0 && isCurrentRoundPicksComplete ? (
        <ArrowButton
          direction="left"
          classNames={clsx(styles.arrow, styles.previous)}
          hideGlowAnimation={isMobile}
        />
      ) : (
        <div />
      )}
      {children}
      {currentRoundIndex < contests.length - 1 &&
      isCurrentRoundPicksComplete ? (
        <ArrowButton
          direction="right"
          classNames={clsx(styles.arrow, styles.next)}
        />
      ) : (
        <div />
      )}
    </>
  );
}
