import Button from '@/components/shared/button/button';
import styles from './brackets-table.module.scss';

export default function BracketsTable({ brackets = [], currentRound }) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.titleRow}>
            <th>League</th>
            <th>Team Name</th>
            <th>Correct Picks</th>
            <th>Overall Rank</th>
          </tr>
        </thead>
        <tbody>
          {brackets.map(bracket => {
            const currentSelectedRound = bracket.selectedWinners[currentRound];
            return (
              <tr key={bracket.name}>
                <td className={styles.leagueName}>{bracket.leagueName}</td>
                <td className={styles.teamName}>{bracket.name}</td>

                <td>
                  {`${currentSelectedRound.numberOfCorrectPicks}/${currentSelectedRound.numberOfWinnersInRound}`}
                </td>
                <td>{bracket.ranking}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
