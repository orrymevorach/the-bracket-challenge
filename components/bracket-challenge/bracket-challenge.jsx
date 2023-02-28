import BracketColumn from 'components/bracket-column';
import styles from './bracket-challenge.module.scss';
import { useMatchups } from 'context/matchup-context/matchup-context';
import { split } from 'utils/utils';
import Loader from 'components/loader';

export default function BracketChallenge() {
  const {
    allMatchups: {
      roundOneMatchups = [],
      quarterFinalMatchups = [],
      semiFinalMatchups = [],
      finalsMatchup = [],
      winner,
      isRoundOneLoading,
    },
  } = useMatchups();

  console.log('isRoundOneLoading', isRoundOneLoading);
  console.log('roundOneMatchups', roundOneMatchups);
  if (isRoundOneLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  const [firstHalfRoundOne, secondHalfRoundOne] = split(roundOneMatchups);
  const [firstHalfQuarterFinal, secondHalfQuarterFinal] =
    split(quarterFinalMatchups);
  const [firstHalfSemiFinal, secondHalfSemiFinal] = split(semiFinalMatchups);
  const [firstHalfFinal, secondHalfFinal] = split(
    finalsMatchup.length ? finalsMatchup[0].snowboarders : []
  );

  // This can be cleaned up. Final only has one matchup, and we need to show them on different sides
  const updatedFirstHalfFinal = [
    {
      matchupId: 'R4_M1',
      snowboarders: firstHalfFinal,
    },
  ];

  const updatedSecondHalfFinal = [
    {
      matchupId: 'R4_M1',
      snowboarders: secondHalfFinal,
    },
  ];
  return (
    <div className={styles.row}>
      <div className={styles.row}>
        <BracketColumn matchups={firstHalfRoundOne} round={1} />
        <BracketColumn matchups={firstHalfQuarterFinal} round={2} />
        <BracketColumn matchups={firstHalfSemiFinal} round={3} />
        <BracketColumn matchups={updatedFirstHalfFinal} round={4} />
      </div>
      <BracketColumn matchups={winner} round={5} />
      <div className={styles.row}>
        <BracketColumn matchups={updatedSecondHalfFinal} round={4} />
        <BracketColumn matchups={secondHalfSemiFinal} round={3} />
        <BracketColumn matchups={secondHalfQuarterFinal} round={2} />
        <BracketColumn matchups={secondHalfRoundOne} round={1} />
      </div>
    </div>
  );
}
