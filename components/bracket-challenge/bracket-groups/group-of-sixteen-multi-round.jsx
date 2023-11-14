import BracketColumn from '../bracket-column/bracket-column';
import styles from './bracket-groups.module.scss';

export default function GroupOfSixteenMultiRound({
  firstHalfRoundOne,
  firstHalfQuarterFinal,
  firstHalfSemiFinal,
  updatedFirstHalfFinal,
  updatedSecondHalfFinal,
  secondHalfSemiFinal,
  secondHalfQuarterFinal,
  secondHalfRoundOne,
  winner,
}) {
  return (
    <div className={styles.row}>
      <div className={styles.row}>
        <BracketColumn matchups={firstHalfRoundOne} round={1} />
        <BracketColumn matchups={firstHalfQuarterFinal} round={2} />
        <BracketColumn matchups={firstHalfSemiFinal} round={3} />
        <BracketColumn matchups={updatedFirstHalfFinal} round={4} />
      </div>
      <div className={styles.row}>
        <BracketColumn matchups={updatedSecondHalfFinal} round={4} />
        <BracketColumn matchups={secondHalfSemiFinal} round={3} />
        <BracketColumn matchups={secondHalfQuarterFinal} round={2} />
        <BracketColumn matchups={secondHalfRoundOne} round={1} />
      </div>

      <div className={styles.winnerContainer}>
        <BracketColumn
          matchups={winner}
          round={5}
          bracketClassNames={styles.winnersBracket}
          isChampion
        />
      </div>
    </div>
  );
}
