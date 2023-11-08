import { useState } from 'react';
import styles from './round-buttons.module.scss';
import RoundButton from './round-button/round-button';

const ROUNDS = [
  {
    name: 'NST Duels',
  },
  {
    name: 'Revelstoke Mountain Resort',
  },
  {
    name: 'Selkirk Tangiers',
  },
];
const defaultRound = { name: 'Total' };

export default function RoundButtons() {
  const [currentRound, setCurrentRound] = useState(defaultRound);
  const [currentHoverRound, setCurrentHoverRound] = useState(null);

  return (
    <>
      <p className={styles.resultsText}>Results</p>
      <div className={styles.roundHeadingContainer}>
        <RoundButton
          key="Total"
          round={defaultRound}
          setCurrentHoverRound={setCurrentHoverRound}
          setCurrentRound={setCurrentRound}
          currentRound={currentRound}
          currentHoverRound={currentHoverRound}
        />
        {ROUNDS.map(round => {
          return (
            <RoundButton
              key={round.name}
              round={round}
              setCurrentHoverRound={setCurrentHoverRound}
              setCurrentRound={setCurrentRound}
              currentRound={currentRound}
              currentHoverRound={currentHoverRound}
            />
          );
        })}
      </div>
    </>
  );
}
