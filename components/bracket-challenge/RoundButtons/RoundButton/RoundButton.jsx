import styles from './RoundButton.module.scss';
import clsx from 'clsx';

export default function RoundButton({
  currentRoundIndex,
  currentHoverRoundIndex,
  setCurrentHoverRoundIndex,
  index,
  handleClick,
  round,
}) {
  const isCurrentRounnd = currentHoverRoundIndex
    ? currentHoverRoundIndex === index
    : currentRoundIndex === index;

  return (
    <button
      key={round.name}
      className={clsx(
        styles.roundHeadingButton,
        isCurrentRounnd && styles.active
      )}
      onClick={handleClick}
      onMouseOver={() => setCurrentHoverRoundIndex(index)}
      onMouseLeave={() => setCurrentHoverRoundIndex(null)}
    >
      <p className={styles.roundText}>{round.name}</p>
      <p className={styles.roundText}>{round.subBracket}</p>
    </button>
  );
}
