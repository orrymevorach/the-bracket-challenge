import styles from './OverallRankingsTable.module.scss';
import Loader from '@/components/shared/Loader/Loader';
import LeagueRankingsTable from '../LeagueRankingsTable/LeagueRankingsTable';
import { useUser } from '@/context/user-context/user-context';
import tableStyles from '@/components/shared/Table/Table.module.scss';
import useWindowSize from '@/hooks/useWindowSize';
import Button from '@/components/shared/Button/Button';
import clsx from 'clsx';
import { useRouter } from 'next/router';

export default function OverallRankingsTable({ leagueData, sports }) {
  const user = useUser();
  const router = useRouter();
  const { isMobile } = useWindowSize();
  const currentContest = sports?.find(({ name }) => leagueData.sport === name);
  const isSelectionsEnabled =
    currentContest?.enableSelectionsLookup?.includes('True');
  const isBracketLocked = currentContest?.lockBracketsLookup?.includes('True');

  const bracketsRanked = leagueData.json
    .filter(bracket => {
      if (!bracket.rankData) return false;
      return true;
    })
    .sort((a, b) => {
      let aRank = a.rankData?.rank;
      let bRank = b.rankData?.rank;
      if (aRank > bRank) return 1;
      return -1;
    });

  const topTenBrackets = bracketsRanked.slice(0, 10);

  const userBrackets = leagueData?.json?.filter(bracket => {
    return user?.brackets?.includes(bracket.id);
  });

  return (
    <div className={styles.table}>
      <LeagueRankingsTable
        leagueData={{ ...leagueData, json: topTenBrackets }}
        sports={sports}
      />
      <p className={styles.dotdotdot}>...</p>
      <div className={tableStyles.container}>
        <div className={tableStyles.innerContainer}>
          <table className={tableStyles.table}>
            <tbody>
              {userBrackets
                .sort((a, b) => {
                  let aRank = a.rankData?.rank;
                  let bRank = b.rankData?.rank;
                  if (aRank > bRank) return 1;
                  return -1;
                })
                .map(bracket => {
                  const { rankData, bracketName } = bracket;
                  const totalPoints = rankData?.totalPoints || 0;
                  const rank = rankData?.rank;
                  const numberOfWinners = rankData?.numberOfWinners || 0;
                  const correctPicks = rankData?.correctPicks || 0;

                  return (
                    <tr key={`row-${leagueData.id}-${bracketName}`}>
                      <td className={tableStyles.rank}>
                        <p
                          className={tableStyles.number}
                          style={{
                            backgroundColor:
                              currentContest?.secondaryColor ||
                              currentContest?.color,
                          }}
                        >
                          {rank}
                        </p>
                      </td>
                      <td>
                        <p>{bracketName}</p>
                      </td>
                      {!isMobile && isSelectionsEnabled && (
                        <>
                          <td>{totalPoints}</td>
                          <td>
                            {correctPicks}/{numberOfWinners}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {userBrackets?.length && (
            <div>
              {userBrackets.map(bracket => {
                const isCurrentUsersBracket = user.brackets?.includes(
                  bracket.id
                );
                const isBracketEditable =
                  isCurrentUsersBracket &&
                  isSelectionsEnabled &&
                  !isBracketLocked;
                const buttonText = isBracketEditable
                  ? 'Edit Bracket'
                  : 'View Bracket';

                const showButton =
                  (isCurrentUsersBracket && isSelectionsEnabled) ||
                  (!isCurrentUsersBracket &&
                    isSelectionsEnabled &&
                    isBracketLocked);

                return (
                  <div
                    className={tableStyles.buttonContainer}
                    key={`button-${bracket.id}-${bracket.name}`}
                  >
                    {showButton && (
                      <Button
                        classNames={clsx(
                          tableStyles.button,
                          isBracketEditable && tableStyles.pulse
                        )}
                        style={{
                          backgroundColor:
                            currentContest?.secondaryColor ||
                            currentContest?.color,
                          border: `1px solid ${
                            currentContest?.secondaryColor ||
                            currentContest?.color
                          }`,
                        }}
                        handleClick={() =>
                          router.push({
                            pathname: `${
                              ROUTES.BRACKET_CHALLENGE
                            }/${leagueData.sport.toLowerCase()}`,
                            query: {
                              leagueId: leagueData.id,
                              bracketId: bracket.id,
                            },
                          })
                        }
                      >
                        {buttonText}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
