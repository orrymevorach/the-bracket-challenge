import bracketStyles from 'components/dashboard/user-brackets-table/user-brackets-table.module.scss';

export default function LeagueSummaryTable({ leagueData, currentRound }) {
  return (
    <table className={bracketStyles.table}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Correct Picks</th>
          <th>Total Points</th>
        </tr>
      </thead>
      <tbody>
        {leagueData
          .sort((a, b) => {
            const removeTieStringAndConvertToFloat = rank =>
              parseFloat(rank.replace('T-', ''));
            const aFloat = removeTieStringAndConvertToFloat(a.rank);
            const bFloat = removeTieStringAndConvertToFloat(b.rank);
            if (aFloat > bFloat) return 1;
            return -1;
          })
          .map(({ name, rank, selectedWinners }) => {
            const numberOfCorrectPicks =
              selectedWinners[currentRound].numberOfCorrectPicks;
            const numberOfWinnersInRound =
              selectedWinners[currentRound].numberOfWinnersInRound;
            return (
              <tr key={name} className={bracketStyles.titleRow}>
                <td className={bracketStyles.rankColumn}>{rank}</td>
                <td>
                  <p className={bracketStyles.nameColumn}>{name}</p>
                </td>
                <td>
                  {numberOfCorrectPicks}/{numberOfWinnersInRound}
                </td>
                <td>100</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
