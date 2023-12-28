import styles from './user-brackets-table.module.scss';
import clsx from 'clsx';
import Button from '@/components/shared/button/button';
import { ROUTES } from '@/utils/constants';
import { useRouter } from 'next/router';

export default function UserBracketsTable({ leagues = [], currentRound }) {
  const router = useRouter();
  if (!leagues || !leagues.length) {
    return (
      <div>
        <p>
          You are currently not in any leagues. Please join or create a league.
        </p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.titleRow}>
            <th className={styles.leagueHeading}>League</th>
            <th>Team Name</th>
            <th>Overall Rank</th>
            <th>Correct Picks</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((league, index) => {
            const hasSelectedWinners = !!league.selectedWinners;

            const currentSelectedRound = hasSelectedWinners
              ? league.selectedWinners[currentRound]
              : '';
            const correctPicks = hasSelectedWinners
              ? `${currentSelectedRound.numberOfCorrectPicks}/${currentSelectedRound.numberOfWinnersInRound}`
              : '';
            const handleClick = () => {
              router.push(`/league/${league.id}`);
            };
            return (
              <tr
                className={styles.leagueRow}
                key={league.leagueName}
                onClick={handleClick}
              >
                <td className={clsx(styles.leagueName)}>
                  <p>
                    <span className={styles.number}>{index + 1}</span>{' '}
                    {league.leagueName}
                  </p>
                </td>
                <td
                  className={clsx(
                    styles.teamName,
                    !hasSelectedWinners && styles.noSelectedWinners
                  )}
                >
                  {league.bracketName}
                </td>
                <td
                  className={clsx(
                    !hasSelectedWinners && styles.noSelectedWinners
                  )}
                >
                  {league.ranking}
                </td>

                <td>{correctPicks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.buttonsContainer}>
        {leagues.map(league => {
          const hasSelectedWinners = league.bracketName;
          if (!hasSelectedWinners) {
            return (
              <div
                className={styles.buttonContainer}
                key={`create-bracket-${league.leagueName}`}
              >
                <Button
                  isSecondary
                  classNames={styles.createBracketButton}
                  href={{
                    pathname: ROUTES.BRACKET_CHALLENGE,
                    query: { leagueId: league.id },
                  }}
                >
                  Create Bracket
                </Button>
              </div>
            );
          }
          // Space placeholder for leagues that do not have the button
          return (
            <div
              className={styles.buttonContainer}
              key={`create-bracket-${league.leagueName}`}
            >
              <Button
                isSecondary
                isInverted
                classNames={styles.createBracketButton}
                href={`/league/${league.id}`}
              >
                View League
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
