import { split } from '@/utils/utils';
import BracketColumn from '../bracket-column/bracket-column';
import styles from './bracket-groups.module.scss';

export default function GroupOfFourMultiRound({
  firstHalfRoundOne,
  firstHalfQuarterFinal,
  firstHalfSemiFinal,
}) {
  const roundOne = split(firstHalfRoundOne)[0];
  const roundTwo = split(firstHalfQuarterFinal)[0];
  const roundThree = split(firstHalfSemiFinal)[0];
  return (
    <div className={styles.row}>
      <div className={styles.row}>
        <BracketColumn matchups={roundOne} round={1} />
        <BracketColumn matchups={roundTwo} round={2} />
        <BracketColumn matchups={roundThree} round={3} isChampion />
      </div>
    </div>
  );
}
