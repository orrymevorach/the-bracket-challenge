import { useConfig } from '@/context/config-context/config-context';
import styles from './round-button.module.scss';
import clsx from 'clsx';

export default function RoundButton({
  round,
  setCurrentHoverRound,
  setCurrentRound,
  currentRound,
  currentHoverRound,
  setIsLoading = () => {},
  index,
}) {
  const isCurrentRounnd = currentHoverRound
    ? !!(currentHoverRound.name === round.name)
    : !!(round.name === currentRound.name);

  const { config, setConfig } = useConfig();
  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentRound(round);
      setConfig({
        ...config,
        currentRound: round.name,
      });
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
      <p className={styles.roundText}>Round {index + 1}</p>
      {round.displayName}
    </button>
  );
}
