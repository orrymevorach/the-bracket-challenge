import { split } from '@/utils/utils';
import BracketColumn from '../bracket-column/bracket-column';
import styles from './bracket-groups.module.scss';

export default function GroupOfEightSingleRound({
  firstHalfRoundOne,
  firstHalfQuarterFinal,
}) {
  const [roundOneFirstHalf, roundOneSecondHalf] = split(firstHalfRoundOne);
  const [roundTwoFirstHalf, roundTwoSecondHalf] = split(firstHalfQuarterFinal);
  return (
    <div className={styles.row}>
      <div className={styles.row}>
        <BracketColumn matchups={roundOneFirstHalf} round={1} />
        <BracketColumn matchups={roundTwoFirstHalf} round={2} />
      </div>
      <div className={styles.row}>
        <BracketColumn matchups={roundTwoSecondHalf} round={2} />
        <BracketColumn matchups={roundOneSecondHalf} round={1} />
      </div>
    </div>
  );
}
