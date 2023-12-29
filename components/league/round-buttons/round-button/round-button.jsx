import { useConfig } from '@/context/config-context/config-context';
import styles from './round-button.module.scss';
import clsx from 'clsx';

export default function RoundButton({
  round,
  setCurrentHoverRound,
  currentRound,
  currentHoverRound,
  index,
  handleClick,
}) {
  const isCurrentRounnd = currentHoverRound
    ? !!(currentHoverRound.name === round.name)
    : !!(round.name === currentRound.name);

  return (
    <button
      key={round.name}
      className={clsx(
        styles.roundHeadingButton,
        isCurrentRounnd && styles.active
      )}
      onClick={handleClick}
      onMouseOver={() => setCurrentHoverRound(round)}
      onMouseLeave={() => setCurrentHoverRound(null)}
    >
      <p className={styles.roundText}>Round {index + 1}:</p>
      <p className={styles.roundName}>{round.displayName}</p>
    </button>
  );
}
