import BracketColumn from '../bracket-column/bracket-column';
import styles from './bracket-groups.module.scss';

export default function GroupOfEightMultiRound({
  firstHalfRoundOne,
  secondHalfRoundOne,
  firstHalfRoundTwo,
  firstHalfRoundThree,
  updatedFirstHalfRoundFour,
}) {
  return (
    <div className={styles.row}>
      <div className={styles.row}>
        <div>
          <BracketColumn matchups={firstHalfRoundOne} round={1} />
          {/* Possible bug: If the user has made selections, second half of round is required, but if the user has not made selections, it is not required.  */}
          {secondHalfRoundOne && (
            <BracketColumn matchups={secondHalfRoundOne} round={1} />
          )}
        </div>

        <BracketColumn matchups={firstHalfRoundTwo} round={2} />
        <BracketColumn matchups={firstHalfRoundThree} round={3} />
        <BracketColumn
          matchups={updatedFirstHalfRoundFour}
          round={4}
          isChampion
        />
      </div>
    </div>
  );
}
