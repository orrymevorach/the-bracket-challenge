import useWindowSize from '@/hooks/useWindowSize';
// import styles from './ArrowButton.module.scss';
import { useMatchups } from '@/context/matchup-context/matchup-context';
import { getProgressBarData } from '../ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

export const getIsCurrentRoundPicksComplete = currentContest => {
  if (currentContest.session) {
    return (
      currentContest.session.selectedWinner?.length ===
      currentContest.session.options.length / 2
    );
  }
  if (!currentContest.matchups) return false;
  let totalNumberOfPlayers = currentContest.matchups.length * 2;
  let numberOfSelectedPlayers = 0;

  for (let matchup of currentContest.matchups) {
    if (matchup.team1) numberOfSelectedPlayers++;
    if (matchup.team2) numberOfSelectedPlayers++;
  }
  return totalNumberOfPlayers === numberOfSelectedPlayers;
};

export default function ArrowButton({
  direction = 'left',
  classNames = {},
  hideTextOnMobile = true,
  hideGlowAnimation,
}) {
  const { isMobile } = useWindowSize();
  const { contests, currentRoundIndex, setCurrentRoundIndex, currentContest } =
    useMatchups();

  const handleClickPrevious = () => {
    if (currentRoundIndex <= 0) return;
    setCurrentRoundIndex(currentRoundIndex - 1);
  };

  const handleClickNext = () => {
    if (currentRoundIndex === contests.length - 1) return;
    setCurrentRoundIndex(currentRoundIndex + 1);
  };

  const { numberOfMatchups, numberOfSelectedWinners } =
    getProgressBarData(contests);
  const progress = (numberOfSelectedWinners / numberOfMatchups) * 100;
  const isAllRoundSelectionsComplete = progress === 100;
  const isCurrentRoundPicksComplete =
    getIsCurrentRoundPicksComplete(currentContest);

  const handleClick =
    direction === 'left' ? handleClickPrevious : handleClickNext;
  const text = direction === 'left' ? 'Previous bracket' : 'Next bracket';
  const icon =
    direction === 'left' ? faChevronCircleLeft : faChevronCircleRight;

  return (
    <button
      className={clsx(
        direction === 'left' ? styles.previous : styles.next,
        classNames
      )}
      onClick={handleClick}
    >
      {direction === 'right' && !hideTextOnMobile
        ? text
        : direction === 'right' && !isMobile && text}

      <div
        className={clsx(
          styles.icon,
          direction === 'right' &&
            !hideGlowAnimation &&
            isCurrentRoundPicksComplete &&
            !isAllRoundSelectionsComplete
            ? styles.glow
            : ''
        )}
      >
        <FontAwesomeIcon icon={icon} size={isMobile ? '2x' : 'lg'} />
      </div>
      {direction === 'left' && !isMobile && text}
    </button>
  );
}
