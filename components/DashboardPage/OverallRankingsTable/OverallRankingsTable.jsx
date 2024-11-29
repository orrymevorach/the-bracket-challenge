import { ROUTES } from '@/utils/constants';
import styles from './OverallRankingsTable.module.scss';
import { useRouter } from 'next/router';
import tableStyles from '@/components/shared/Table/Table.module.scss';
import useGetApi from '@/hooks/useGetApi';
import { getAllBracketsRanked } from '@/lib/airtable';
import Loader from '@/components/shared/Loader/Loader';

export default function OverallRankingsTable({ leagues }) {
  const { data: allBracketsRanked = [] } = useGetApi(getAllBracketsRanked);
  const router = useRouter();

  if (!leagues?.length || !allBracketsRanked)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '80px',
        }}
      >
        <Loader isDotted />
      </div>
    );

  const topTenBrackets = allBracketsRanked.slice(0, 10);

  const filteredUserBrackets = leagues.filter(({ bracketId }) => {
    const isBracketInTopTen = !!topTenBrackets.find(
      ({ id }) => id === bracketId
    );
    if (isBracketInTopTen) return false;
    return true;
  });

  return (
    <div className={tableStyles.container}>
      <p className={tableStyles.title}>Overall Leaders</p>
      <div className={tableStyles.innerContainer}>
        <table className={tableStyles.table}>
          <thead>
            <tr className={tableStyles.titleRow}>
              <th className={tableStyles.rank}>Rank</th>
              <th>Bracket Name</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {allBracketsRanked
              .sort((a, b) => {
                if (b.selections.totalPoints > a.selections.totalPoints)
                  return 1;
                return -1;
              })
              .map(
                (
                  { name, id, selections: { totalPoints, overallRank } },
                  index
                ) => {
                  const handleClick = () => {
                    router.push(`${ROUTES.SONG_CHALLENGE}?bracketId=${id}`);
                  };

                  const isRanked =
                    overallRank && typeof overallRank === 'number';
                  if (!isRanked) return;
                  return (
                    <tr key={`rankings-${name}-${index}`} onClick={handleClick}>
                      <td className={tableStyles.rank}>
                        <span className={tableStyles.number}>
                          {overallRank}
                        </span>
                      </td>
                      <td>
                        <p>{name}</p>
                      </td>

                      <td>{totalPoints}</td>
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
                      `${ROUTES.SONG_CHALLENGE}?bracketId=${bracketId}`
                    );
                  };
                  const bracketData = allBracketsRanked.find(
                    ({ id }) => id === bracketId
                  );
                  if (!bracketData) return;
                  return (
                    <tr key={bracketId} onClick={handleClick}>
                      <td className={tableStyles.rank}>
                        <span className={tableStyles.number}>
                          {overallRank}
                        </span>
                      </td>
                      <td>{bracketName}</td>
                      <td>{bracketData.totalPoints}</td>
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
