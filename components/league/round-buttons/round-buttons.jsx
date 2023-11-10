import { useState } from 'react';
import styles from './round-buttons.module.scss';
import RoundButton from './round-button/round-button';

export const ROUNDS = [
  {
    displayName: 'Overall',
    name: 'Overall',
  },
  {
    displayName: 'NST Duels',
    name: 'Duels',
  },
  {
    displayName: 'Revelstoke Mountain Resort',
    name: 'Revelstoke',
  },
  {
    displayName: 'Selkirk Tangiers',
    name: 'Selkirk',
  },
];

export default function RoundButtons({
  setCurrentRound,
  currentRound,
  setIsLoading,
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
      {ROUNDS.map(round => {
        return <RoundButton {...props} key={round.name} round={round} />;
      })}
    </div>
  );
}
