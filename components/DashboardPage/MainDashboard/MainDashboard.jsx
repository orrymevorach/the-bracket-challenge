import styles from './MainDashboard.module.scss';
// import OverallRankingsTable from '../OverallRankingsTable/OverallRankingsTable';
import Border from '../Border/Border';
// import Wrapper from '@/components/shared/Wrapper/Wrapper';
import Button from '@/components/shared/Button/Button';
import LeagueRankingsTable from '@/components/DashboardPage/LeagueRankingsTable/LeagueRankingsTable';
import { useUser } from '@/context/user-context/user-context';
import useWindowSize from '@/hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTileData } from '../NewUserDashboard/NewUserDashboard';
import OverallRankingsTable from '../OverallRankingsTable';

export default function MainDashboard({
  leagueData = [],
  setShowCreateLeagueTakeover,
  setShowJoinLeagueTakeover,
  setShowJoinPublicLeagueTakeover,
  sports,
}) {
  const user = useUser();
  const { isDesktop, isMobile } = useWindowSize();
  const tileData = getTileData({
    setShowJoinLeagueTakeover,
    setShowCreateLeagueTakeover,
    setShowJoinPublicLeagueTakeover,
  });
  const openLeagueIds = sports.map(({ openLeagueId }) => openLeagueId[0]);

  return (
    <div className={styles.tablesContainer}>
      <div className={styles.topContainer}>
        <p className={styles.title}>Your Leagues</p>
        <div className={styles.buttonsContainer}>
          {tileData.map(tile => {
            return (
              <Button
                handleClick={tile.handleClick}
                classNames={styles.button}
                key={tile.button}
              >
                <span>{tile.button}</span>
                <FontAwesomeIcon
                  icon={tile.icon}
                  size={isMobile ? 'xl' : '1x'}
                />
              </Button>
            );
          })}
        </div>
      </div>
      <div className={styles.scrollContainer}>
        {leagueData
          .sort(a => {
            const leagueAdmin = a?.admin && a.admin[0];
            const isAdmin = leagueAdmin && user.id === leagueAdmin;
            if (isAdmin) return -1;
            const isOpenLeague = openLeagueIds.includes(a.id);
            if (isOpenLeague) return 1;
          })
          .map(league => {
            const sport = league.sport;
            const isOpenLeague = openLeagueIds.includes(league.id);
            // Use this code to show the top ten brackets in the open league, AFTER Duels air
            if (isOpenLeague) {
              return (
                <OverallRankingsTable
                  key={`${sport}-${league.name}`}
                  leagueData={league}
                  sports={sports}
                />
              );
            }
            // Use this code to show only the user's bracket in the open league, once brackets open but BEFORE Duels air
            // if (isOpenLeague) {
            // only show users bracket for the open league
            // const userBrackets = user.brackets;
            // const openLeagueBrackets = league.userBrackets;
            // const userBracket = userBrackets.find(bracketId =>
            //   openLeagueBrackets.includes(bracketId)
            // );
            // const filteredJson = league.json.filter(bracket => {
            //   return userBracket === bracket.id;
            // });
            // league.json = filteredJson;
            // }
            return (
              <div key={`${sport}-${league.name}`} className={styles.table}>
                <LeagueRankingsTable
                  leagueData={league}
                  sports={sports}
                  isOpenLeague={isOpenLeague}
                />
              </div>
            );
          })}
      </div>
      {isDesktop && <Border />}
    </div>
  );
}
