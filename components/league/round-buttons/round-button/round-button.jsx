import styles from './round-button.module.scss';
import clsx from 'clsx';

export default function RoundButton({
  round,
  setCurrentHoverRound,
  setCurrentRound,
  currentRound,
  currentHoverRound,
  setIsLoading = () => {},
}) {
  const isCurrentRounnd = currentHoverRound
    ? !!(currentHoverRound.name === round.name)
    : !!(round.name === currentRound.name);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentRound(round);
      setIsLoading(false);
    }, 300);
  };
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
      {round.displayName}
    </button>
  );
}
