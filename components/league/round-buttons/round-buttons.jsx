import { useState } from 'react';
import styles from './round-buttons.module.scss';
import RoundButton from './round-button/round-button';

export default function RoundButtons({
  setCurrentRound,
  currentRound,
  setIsLoading,
  rounds,
}) {
  const [currentHoverRound, setCurrentHoverRound] = useState(null);
  const props = {
    setCurrentHoverRound,
    setCurrentRound,
    currentRound,
    currentHoverRound,
    setIsLoading,
  };
  return (
    <div className={styles.roundHeadingContainer}>
      {rounds.map(round => {
        return <RoundButton {...props} key={round.name} round={round} />;
      })}
    </div>
  );
}
