import BracketColumn from 'components/bracket-column';
import styles from './bracket-challenge.module.scss';
import { useMatchups } from 'context/matchup-context/matchup-context';
import { split } from 'utils/utils';
import Loader from 'components/loader';
import Button from 'components/button/button';
import { updateUserBracket } from 'airtable-utils';
import { useUser } from 'context/user-context/user-context';

export default function BracketChallenge() {
  const { allMatchups } = useMatchups();
  const { userTeamData, isUserTeamDataLoading } = useUser();

  const {
    roundOneMatchups = [],
    quarterFinalMatchups = [],
    semiFinalMatchups = [],
    finalsMatchup = [],
    winner,
  } = allMatchups;

  if (isUserTeamDataLoading) {
    return <Loader />;
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
  const handleSubmit = async () => {
    // Convert latest data to array
    const allMatchupsAsArray = Object.entries(allMatchups);
    // For each round, return an array of records of each matchup winner
    const matchupWinnerRecords = allMatchupsAsArray
      .map(([_, roundData]) => {
        const winners = roundData
          .map(round => round.winner?.id)
          .filter(id => id);
        return winners;
      })
      .filter(selection => !!selection);

    const [
      roundOneMatchups,
      quarterFinalMatchups,
      semiFinalMatchups,
      finalsMatchup,
      winner,
    ] = matchupWinnerRecords;
    await updateUserBracket({
      roundOneWinners: roundOneMatchups,
      quarterFinalWinners: quarterFinalMatchups,
      semiFinalWinners: semiFinalMatchups,
      winner,
      id: userTeamData.brackets[0].id,
    });
  };
  return (
    <div className={styles.bracketChallengeContainer}>
      <Button
        classNames={styles.submitButton}
        handleClick={() => handleSubmit()}
      >
        Submit
      </Button>
      <div className={styles.row}>
        <div className={styles.row}>
          <BracketColumn matchups={firstHalfRoundOne} round={1} />
          <BracketColumn matchups={firstHalfQuarterFinal} round={2} />
          <BracketColumn matchups={firstHalfSemiFinal} round={3} />
          <BracketColumn matchups={updatedFirstHalfFinal} round={4} />
        </div>
        {winner.length ? (
          <>
            <h3>Winner!</h3>
            <div className={styles.winner}>
              <BracketColumn matchups={winner} round={5} />
            </div>
          </>
        ) : (
          ''
        )}

        <div className={styles.row}>
          <BracketColumn matchups={updatedSecondHalfFinal} round={4} />
          <BracketColumn matchups={secondHalfSemiFinal} round={3} />
          <BracketColumn matchups={secondHalfQuarterFinal} round={2} />
          <BracketColumn matchups={secondHalfRoundOne} round={1} />
        </div>
      </div>
    </div>
  );
}
