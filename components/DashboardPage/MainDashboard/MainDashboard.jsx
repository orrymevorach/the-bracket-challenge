import styles from './MainDashboard.module.scss';
// import OverallRankingsTable from '../OverallRankingsTable/OverallRankingsTable';
import Border from '../Border/Border';
// import Wrapper from '@/components/shared/Wrapper/Wrapper';
import Button from '@/components/shared/Button/Button';
import LeagueRankingsTable from '@/components/DashboardPage/LeagueRankingsTable/LeagueRankingsTable';
import { useUser } from '@/context/user-context/user-context';
import useWindowSize from '@/hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function MainDashboard({
  leagueData = [],
  setShowCreateLeagueTakeover,
  setShowJoinLeagueTakeover,
  sports,
}) {
  const user = useUser();
  const { isDesktop } = useWindowSize();

  return (
    <div className={styles.tablesContainer}>
      <div className={styles.scrollContainer}>
        <div className={styles.topContainer}>
          <p className={styles.title}>Your Leagues</p>
          <div className={styles.buttonsContainer}>
            <Button
              handleClick={() => setShowJoinLeagueTakeover(true)}
              classNames={styles.button}
            >
              <span>Join League</span>
              <FontAwesomeIcon icon={faPeopleGroup} />
            </Button>
            <Button
              handleClick={() => setShowCreateLeagueTakeover(true)}
              classNames={styles.button}
            >
              <span>Create League</span>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
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
