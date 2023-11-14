import BracketColumn from '../bracket-column/bracket-column';
import styles from './bracket-groups.module.scss';

export default function GroupOfEightSingleRound({
  firstHalfRoundOne,
  firstHalfQuarterFinal,
}) {
  return (
    <div className={styles.row}>
      <div className={styles.row}>
        <BracketColumn matchups={firstHalfRoundOne} round={1} />
        <BracketColumn matchups={firstHalfQuarterFinal} round={2} />
      </div>
    </div>
  );
}
