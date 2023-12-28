import { ROUTES } from '@/utils/constants';
import styles from './league-rankings-table.module.scss';
import { useRouter } from 'next/router';
import Button from '@/components/shared/button/button';

export default function LeagueRankingsTable({ leagueData }) {
  const router = useRouter();
  const sortedBracketsByRank = leagueData.sort((a, b) => {
    const removeTieStringAndConvertToFloat = rank => parseFloat(rank);
    const aFloat = removeTieStringAndConvertToFloat(a.rank);
    const bFloat = removeTieStringAndConvertToFloat(b.rank);
    if (aFloat > bFloat) return 1;
    return -1;
  });

  const handleClick = ({ id }) => {
    router.push(
      `${ROUTES.BRACKET_CHALLENGE}?bracketId=${id}&leagueId=${router.query.slug}`
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headingRow}>
              <th>Rank</th>
              <th>Team Name</th>
              <th>Total Points</th>
              <th>Correct Picks</th>
              <th>Duels</th>
              <th>Revelstoke</th>
              <th>Selkirk</th>
            </tr>
          </thead>
          <tbody>
            {sortedBracketsByRank.map(({ name, rank, selectedWinners, id }) => {
              return (
                <tr
                  className={styles.titleRow}
                  key={name}
                  onClick={() => handleClick({ id })}
                >
                  <td>
                    <span className={styles.number}>{rank}</span>
                  </td>
                  <td>
                    <p className={styles.nameColumn}>{name}</p>
                  </td>
                  <td>{selectedWinners.Overall.points}</td>
                  <td>
                    {selectedWinners.Overall.numberOfCorrectPicks}/
                    {selectedWinners.Overall.numberOfWinnersInRound}
                  </td>
                  <td>
                    {selectedWinners.Duels.numberOfCorrectPicks}/
                    {selectedWinners.Duels.numberOfWinnersInRound}
                  </td>
                  <td>
                    {selectedWinners.Revelstoke.numberOfCorrectPicks}/
                    {selectedWinners.Revelstoke.numberOfWinnersInRound}
                  </td>
                  <td>
                    {selectedWinners.Selkirk?.numberOfCorrectPicks}/
                    {selectedWinners.Selkirk?.numberOfWinnersInRound}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.buttonsContainer}>
          {sortedBracketsByRank.map(league => {
            return (
              <div
                className={styles.buttonContainer}
                key={`league-button-${league.name}`}
              >
                <Button
                  isYellow
                  classNames={styles.button}
                  handleClick={() => handleClick({ id: league.id })}
                >
                  View Bracket
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
