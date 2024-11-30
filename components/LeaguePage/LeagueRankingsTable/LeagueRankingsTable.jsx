import { ROUTES } from '@/utils/constants';
import styles from './LeagueRankingsTable.module.scss';
import { useRouter } from 'next/router';
import Button from '@/components/shared/Button/Button';

export default function LeagueRankingsTable({ leagueData, contests }) {
  const router = useRouter();

  const brackets = leagueData.json;

  const handleClick = ({ id }) => {
    router.push(
      `${ROUTES.BRACKET_CHALLENGE}?bracketId=${id}&leagueId=${leagueData.id}`
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
              {/* <th>Total Points</th> */}
              {/* <th>Correct Picks</th> */}
              {contests.map(({ name }) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {brackets.map(({ username, rank, selections, id }) => {
              return (
                <tr
                  className={styles.titleRow}
                  key={username}
                  onClick={() => handleClick({ id })}
                >
                  <td>
                    <span className={styles.number}>{rank}</span>
                  </td>
                  <td>
                    <p className={styles.nameColumn}>{username}</p>
                  </td>
                  {contests.map(comp => {
                    const selectionsInCurrentRound = selections[comp.name];
                    const correctPicksInRound =
                      selectionsInCurrentRound?.correctPicks || 0;
                    const numberOfWinnersInRound =
                      selectionsInCurrentRound?.numberOfWinners || 0;
                    return (
                      <td key={`${username}-${comp.name}comp.name`}>
                        {correctPicksInRound}/{numberOfWinnersInRound}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.buttonsContainer}>
          {brackets.map(league => {
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
