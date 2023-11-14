import BracketColumn from '../bracket-column/bracket-column';
import styles from './bracket-groups.module.scss';

export default function GroupOfSixteenSingleRound({
  firstHalfRoundOne,
  firstHalfQuarterFinal,
  secondHalfRoundOne,
  secondHalfQuarterFinal,
}) {
  return (
    <div className={styles.row}>
      <div className={styles.row}>
        <BracketColumn matchups={firstHalfRoundOne} round={1} />
        <BracketColumn matchups={firstHalfQuarterFinal} round={2} />
      </div>
      <div className={styles.row}>
        <BracketColumn matchups={secondHalfQuarterFinal} round={2} />
        <BracketColumn matchups={secondHalfRoundOne} round={1} />
      </div>
    </div>
  );
}
