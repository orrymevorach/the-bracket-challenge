import styles from './user-brackets-table.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import Button from '@/components/shared/button/button';
import { ROUTES } from '@/utils/constants';

export default function UserBracketsTable({ leagues = [], currentRound }) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.titleRow}>
            <th className={styles.leagueHeading}>League</th>
            <th>Team Name</th>
            <th>Overall Rank</th>
            <th>Correct Picks</th>
            <th></th>
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
            return (
              <tr key={league.leagueName}>
                <td className={clsx(styles.leagueName)}>
                  <p>
                    <span className={styles.number}>{index + 1}</span>{' '}
                    <Link href={`/league/${league.id}`}>
                      {league.leagueName}
                    </Link>
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
                <td>
                  {!hasSelectedWinners && (
                    <Button
                      isSecondary
                      classNames={styles.createBracketButton}
                      href={ROUTES.BRACKET_CHALLENGE}
                    >
                      Create Bracket
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
