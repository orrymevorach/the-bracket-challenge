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

export default function MainDashboard({
  leagueData = [],
  setShowCreateLeagueTakeover,
  setShowJoinLeagueTakeover,
  setShowJoinPublicLeagueTakeover,
  sports,
}) {
  const user = useUser();
  const { isDesktop } = useWindowSize();
  const tileData = getTileData({
    setShowJoinLeagueTakeover,
    setShowCreateLeagueTakeover,
    setShowJoinPublicLeagueTakeover,
  });

  return (
    <div className={styles.tablesContainer}>
      <div className={styles.scrollContainer}>
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
                  <FontAwesomeIcon icon={tile.icon} />
                </Button>
              );
            })}
          </div>
        </div>
        {leagueData
          .sort(a => {
            const leagueAdmin = a?.admin && a.admin[0];
            const isAdmin = leagueAdmin && user.id === leagueAdmin;
            if (isAdmin) return -1;
          })
          .map(league => {
            return (
              <div key={league.name} className={styles.table}>
                <LeagueRankingsTable leagueData={league} sports={sports} />
              </div>
            );
          })}
      </div>
      {isDesktop && <Border />}
      {/* <OverallRankingsTable leagues={leagueData} sports={sports} /> */}
    </div>
  );
}
