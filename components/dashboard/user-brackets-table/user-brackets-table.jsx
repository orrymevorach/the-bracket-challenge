import styles from './user-brackets-table.module.scss';
import Link from 'next/link';

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
            const ranking = league.ranking || 'NA';
            const correctPicks = hasSelectedWinners
              ? `${currentSelectedRound.numberOfCorrectPicks}/${currentSelectedRound.numberOfWinnersInRound}`
              : 'NA';

            return (
              <tr key={league.leagueName}>
                <td className={styles.leagueName}>
                  <Link href={`/league/${league.leagueName}`}>
                    {league.leagueName}
                  </Link>
                </td>
                <td className={styles.teamName}>{league.bracketName}</td>
                <td>{ranking}</td>

                <td>{correctPicks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
