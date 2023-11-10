import styles from './user-brackets-table.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import Button from '@/components/shared/button/button';

export default function UserBracketsTable({ leagues = [], currentRound }) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.titleRow}>
            <th>League</th>
            <th>Team Name</th>
            <th>Overall Rank</th>
            <th>Correct Picks</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map(league => {
            const hasSelectedWinners = !!league.selectedWinners;
            const currentSelectedRound = hasSelectedWinners
              ? league.selectedWinners[currentRound]
              : '';
            const correctPicks = hasSelectedWinners
              ? `${currentSelectedRound.numberOfCorrectPicks}/${currentSelectedRound.numberOfWinnersInRound}`
              : '';
            const ranking = league.ranking || (
              <Button isSmall classNames={styles.createBracketButton}>
                Create Bracket
              </Button>
            );
            return (
              <tr key={league.leagueName}>
                <td className={clsx(styles.leagueName)}>
                  <Link href={`/league/${league.leagueName}`}>
                    {league.leagueName}
                  </Link>
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
                  {ranking}
                </td>

                <td>{correctPicks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
