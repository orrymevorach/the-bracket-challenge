import styles from './OverallRankingsTable.module.scss';
import Loader from '@/components/shared/Loader/Loader';
import LeagueRankingsTable from '../LeagueRankingsTable/LeagueRankingsTable';
import { useUser } from '@/context/user-context/user-context';

export default function OverallRankingsTable({ leagues, sports }) {
  const user = useUser();

  const mapSportsToOpenLeagueId = sports.reduce((acc, sport) => {
    if (!sport.openLeagueId?.length) return acc;
    acc[sport.name] = sport.openLeagueId[0];
    return acc;
  }, {});

  let currentContest = '';
  const openLeague = leagues.find(league => {
    const currentSportOpenLeagueId = mapSportsToOpenLeagueId[league.sport];

    if (currentSportOpenLeagueId === league.id) {
      currentContest = sports.find(({ name }) => name === league.sport);
      return true;
    }
    return false;
  });

  const topTenBrackets = openLeague.slice(0, 10);
  openLeague.json = topTenBrackets;

  const userBrackets = allBracketsRanked.filter(bracket => {
    return user.brackets.includes(bracket.id);
  });

  if (!leagues?.length || !openLeague)
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

  return (
    <div className={styles.table}>
      <LeagueRankingsTable leagueData={openLeague} sports={sports} />
      <p className={styles.dotdotdot}>...</p>
    </div>
  );
}
