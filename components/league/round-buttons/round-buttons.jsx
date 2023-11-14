import { useState } from 'react';
import styles from './round-buttons.module.scss';
import RoundButton from './round-button/round-button';
import clsx from 'clsx';

export default function RoundButtons({
  setCurrentRound,
  currentRound,
  setIsLoading,
  rounds,
  classNames = '',
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
    <div className={clsx(styles.roundHeadingContainer, classNames)}>
      {rounds.map(round => {
        return <RoundButton {...props} key={round.name} round={round} />;
      })}
    </div>
  );
}
