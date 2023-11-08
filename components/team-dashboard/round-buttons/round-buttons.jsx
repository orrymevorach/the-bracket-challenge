import { useState } from 'react';
import styles from './round-buttons.module.scss';
import RoundButton from './round-button/round-button';
import { ROUNDS } from '../team-dashboard';

export default function RoundButtons({
  defaultRound,
  setCurrentRound,
  currentRound,
}) {
  const [currentHoverRound, setCurrentHoverRound] = useState(null);

  return (
    <>
      <p className={styles.resultsText}>Results</p>
      <div className={styles.roundHeadingContainer}>
        <RoundButton
          key="Overall"
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
