import { useMatchups } from '@/context/matchup-context/matchup-context';
import styles from './ProgressBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import useWindowSize from '@/hooks/useWindowSize';

export default function ProgressBar() {
  const { isMobile } = useWindowSize();
  const { contests, currentRoundIndex, setCurrentRoundIndex } = useMatchups();
  const progressBarColor = contests[0].textStrokeColor || contests[0].color;
  const backgroundColor = contests[0].textStrokeColor
    ? contests[0].color
    : '#f3f3f3';

  const allMatchups = contests
    .flatMap(contest => {
      if (contest.enableSelections === 'True') return contest.matchups;
    })
    .filter(contest => !!contest);

  const allSelectedWinners = contests
    .map(contest => {
      if (contest.enableSelections === 'True')
        return contest.matchups
          .map(matchup => {
            return matchup.winner;
          })
          .filter(contest => !!contest);
    })
    .flat();
  const progress = (allSelectedWinners.length / allMatchups.length) * 100;

  const handleClickPrevious = () => {
    if (currentRoundIndex <= 0) return;
    setCurrentRoundIndex(currentRoundIndex - 1);
  };

  const handleClickNext = () => {
    if (currentRoundIndex === contests.length - 1) return;
    setCurrentRoundIndex(currentRoundIndex + 1);
  };

  if (!allMatchups.length) return null;

  return (
    <div className={styles.container}>
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
          {allSelectedWinners.length} / {allMatchups.length}
          <span> picks complete</span>
        </p>
        {currentRoundIndex < contests.length - 1 ? (
          <button className={styles.next} onClick={handleClickNext}>
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
        }}
      >
        <div
          className={styles.progressBar}
          style={{
            width: `${progress}%`,
            backgroundColor: progressBarColor,
          }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
