import { useMatchups } from '@/context/matchup-context/matchup-context';
import styles from './ProgressBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import useWindowSize from '@/hooks/useWindowSize';

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

export default function ProgressBar() {
  const { isMobile } = useWindowSize();
  const { contests, currentRoundIndex, setCurrentRoundIndex } = useMatchups();
  const progressBarColor = contests[0].textStrokeColor || contests[0].color;
  const backgroundColor = contests[0].textStrokeColor
    ? contests[0].color
    : '#f3f3f3';

  const { numberOfMatchups, numberOfSelectedWinners } =
    getProgressBarData(contests);

  const progress = (numberOfSelectedWinners / numberOfMatchups) * 100;

  const handleClickPrevious = () => {
    if (currentRoundIndex <= 0) return;
    setCurrentRoundIndex(currentRoundIndex - 1);
  };

  const handleClickNext = () => {
    if (currentRoundIndex === contests.length - 1) return;
    setCurrentRoundIndex(currentRoundIndex + 1);
  };

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
          {numberOfSelectedWinners} / {numberOfMatchups}
          {!isMobile && <span> picks complete</span>}
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
          border: `2px solid ${progressBarColor}`,
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
