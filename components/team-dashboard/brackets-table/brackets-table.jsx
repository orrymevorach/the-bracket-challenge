import styles from './brackets-table.module.scss';

export default function BracketsTable({ brackets = [] }) {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>League Name</th>
            <th>Correct Picks</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {brackets.map((bracket, index) => {
            return (
              <tr key={bracket.name}>
                <td>
                  {index + 1}. {bracket.name}
                </td>
                <td>{bracket.leagueName}</td>
                <td>
                  {`${bracket.numberOfCorrectPicks}/${bracket.numberOfWinners}`}
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
