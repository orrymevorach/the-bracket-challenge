import styles from './user-brackets-table.module.scss';
import Link from 'next/link';

export default function UserBracketsTable({ brackets = [], currentRound }) {
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
          {brackets.map(bracket => {
            const currentSelectedRound = bracket.selectedWinners[currentRound];
            return (
              <tr key={bracket.name}>
                <td className={styles.leagueName}>
                  <Link href={`/league/${bracket.leagueName}`}>
                    {bracket.leagueName}
                  </Link>
                </td>
                <td className={styles.teamName}>{bracket.name}</td>
                <td>{bracket.ranking}</td>

                <td>
                  {`${currentSelectedRound.numberOfCorrectPicks}/${currentSelectedRound.numberOfWinnersInRound}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
