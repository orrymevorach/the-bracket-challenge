import styles from './round-button.module.scss';
import clsx from 'clsx';

export default function RoundButton({
  round,
  setCurrentHoverRound,
  setCurrentRound,
  currentRound,
  currentHoverRound,
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
      onClick={() => setCurrentRound(round)}
      onMouseOver={() => setCurrentHoverRound(round)}
      onMouseLeave={() => setCurrentHoverRound(null)}
    >
      {round.name}
    </button>
  );
}
