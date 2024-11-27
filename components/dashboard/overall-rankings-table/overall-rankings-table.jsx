import { ROUTES } from '@/utils/constants';
import styles from './overall-rankings-table.module.scss';
import Button from '@/components/shared/button/button';
import { useRouter } from 'next/router';
import { useUser } from '@/context/user-context/user-context';
import Loader from '@/components/shared/loader/loader';
import { useUserLeague } from '@/context/user-league-context/user-league-context';
import { useWinners } from '@/context/winners-context/winners-context';
import {
  countNumberOfCorrectPicks,
  getTopTenBrackets,
} from '../bracket-ranking-utils';
import useGetApi from '@/hooks/useGetApi';
import { getAllBrackets } from '@/lib/airtable';

export default function OverallRankingsTable() {
  const { data: brackets, isLoading: isBracketsLoading } =
    useGetApi(getAllBrackets);
  const router = useRouter();
  const user = useUser();
  const winnersBracket = useWinners();
  const leagues = useUserLeague();

  if (!brackets) return;
  const overallRankingsData = getTopTenBrackets({ brackets });

  const numberOfCorrectPicks = countNumberOfCorrectPicks({
    bracketData: winnersBracket,
    winners: winnersBracket,
  });

  if (numberOfCorrectPicks.numberOfCorrectPicks === 0) return;

  const topTenBrackets = overallRankingsData.bracketsSortedByRanking.slice(
    0,
    10
  );

  const filteredUserBrackets = leagues.filter(({ bracketId }) => {
    const isBracketInTopTen = !!topTenBrackets.find(
      ({ id }) => id === bracketId
    );
    if (isBracketInTopTen) return false;
    return true;
  });
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div>
          <p className={styles.title}>Top 10 Brackets</p>
        </div>
        <table className={styles.table}>
          <thead>
            <tr className={styles.titleRow}>
              <th className={styles.bracketNameHeading}>Bracket Name</th>
              <th></th>
              <th>Correct Picks</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {topTenBrackets.map(
              ({
                name,
                id,
                scoreData: { points, numberOfCorrectPicks },
                ranking,
                memberID,
              }) => {
                const handleClick = () => {
                  router.push(`${ROUTES.BRACKET_CHALLENGE}?bracketId=${id}`);
                };

                const isCurrentMembersBracket = memberID[0] === user.id;
                return (
                  <tr
                    key={name}
                    onClick={handleClick}
                    className={
                      isCurrentMembersBracket ? styles.currentBracket : ''
                    }
                  >
                    <td className={styles.teamName}>
                      <span className={styles.number}>{ranking}</span>
                      <p>{name}</p>
                    </td>
                    <td>
                      {isCurrentMembersBracket && (
                        <p className={styles.currentBracketText}>Congrats!</p>
                      )}
                    </td>
                    <td>
                      {numberOfCorrectPicks}/
                      {overallRankingsData.numberOfWinners.Overall}
                    </td>
                    <td>{points}</td>
                    <div className={styles.buttonContainer}>
                      <Button
                        isPeach
                        classNames={styles.createBracketButton}
                        href={{
                          pathname: ROUTES.BRACKET_CHALLENGE,
                          query: { bracketId: id },
                        }}
                      >
                        View Bracket
                      </Button>
                    </div>
                  </tr>
                );
              }
            )}
            {filteredUserBrackets.length > 0 && (
              <>
                <p className={styles.dotdotdot}>...</p>
                {filteredUserBrackets.map(({ bracketId, bracketName }) => {
                  if (!bracketId) return;
                  const handleClick = () => {
                    router.push(
                      `${ROUTES.BRACKET_CHALLENGE}?bracketId=${bracketId}`
                    );
                  };
                  const bracketData =
                    overallRankingsData.bracketsSortedByRanking.find(
                      ({ id }) => id === bracketId
                    );
                  if (!bracketData) return;
                  return (
                    <tr
                      key={bracketId}
                      onClick={handleClick}
                      className={styles.currentBracket}
                    >
                      <td className={styles.teamName}>
                        <span className={styles.number}>
                          {bracketData.ranking}
                        </span>
                        {bracketName}
                      </td>
                      <td></td>
                      <td>
                        {bracketData.scoreData.numberOfCorrectPicks}/
                        {overallRankingsData.numberOfWinners.Overall}
                      </td>
                      <td>{bracketData.scoreData.points}</td>
                      <div className={styles.buttonContainer}>
                        <Button
                          isPeach
                          classNames={styles.createBracketButton}
                          href={{
                            pathname: ROUTES.BRACKET_CHALLENGE,
                            query: { bracketId: bracketId },
                          }}
                        >
                          View Bracket
                        </Button>
                      </div>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
