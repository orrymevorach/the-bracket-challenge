import { split } from '@/utils/utils';
import BracketColumn from '../bracket-column/bracket-column';
import styles from './bracket-groups.module.scss';
import Player from '../player/player';

export default function GroupOfFourMultiRound({
  firstHalfRoundOne,
  firstHalfRoundTwo,
  firstHalfRoundThree,
}) {
  const roundOne = split(firstHalfRoundOne)[0];
  const roundTwo = split(firstHalfRoundTwo)[0];
  const winner = firstHalfRoundThree[0].snowboarders[0];
  return (
    <div className={styles.row}>
      <div className={styles.row}>
        <BracketColumn matchups={roundOne} round={1} />
        <BracketColumn matchups={roundTwo} round={2} />
        <div className={styles.winnersBracket}>
          <Player {...winner} isChampion />
        </div>
      </div>
    </div>
  );
}
