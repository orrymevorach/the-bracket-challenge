import BracketColumn from '../bracket-column/bracket-column';
import styles from './bracket-groups.module.scss';

export default function GroupOfEightMultiRound({
  firstHalfRoundOne,
  firstHalfQuarterFinal,
  firstHalfSemiFinal,
  updatedFirstHalfFinal,
}) {
  return (
    <div className={styles.row}>
      <div className={styles.row}>
        <BracketColumn matchups={firstHalfRoundOne} round={1} />
        <BracketColumn matchups={firstHalfQuarterFinal} round={2} />
        <BracketColumn matchups={firstHalfSemiFinal} round={3} />
        <BracketColumn matchups={updatedFirstHalfFinal} round={4} isChampion />
      </div>
    </div>
  );
}
