import BracketColumn from '../bracket-column/bracket-column';
import styles from './bracket-groups.module.scss';

export default function GroupOfSixteenMultiRound({
  firstHalfRoundOne,
  firstHalfRoundTwo,
  firstHalfRoundThree,
  updatedFirstHalfRoundFour,
  updatedSecondHalfRoundFour,
  secondHalfRoundThree,
  secondHalfRoundTwo,
  secondHalfRoundOne,
  winner,
}) {
  return (
    <div className={styles.row}>
      <div className={styles.row}>
        <BracketColumn matchups={firstHalfRoundOne} round={1} />
        <BracketColumn matchups={firstHalfRoundTwo} round={2} />
        <BracketColumn matchups={firstHalfRoundThree} round={3} />
        <BracketColumn matchups={updatedFirstHalfRoundFour} round={4} />
      </div>
      <div className={styles.row}>
        <BracketColumn matchups={updatedSecondHalfRoundFour} round={4} />
        <BracketColumn matchups={secondHalfRoundThree} round={3} />
        <BracketColumn matchups={secondHalfRoundTwo} round={2} />
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
