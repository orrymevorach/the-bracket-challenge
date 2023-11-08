import { useUser } from 'context/user-context/user-context';
import styles from './team-dashboard.module.scss';
import Loader from 'components/shared/loader/loader';
import BracketsTable from './brackets-table/brackets-table';
import useDashboardRankings from './useDashboardRankings';
import { useWinners } from '@/context/winners-context/winners-context';
import RoundButtons from './round-buttons/round-buttons';

export default function TeamDashboard() {
  const user = useUser();
  const winnersData = useWinners();
  const { bracketData } = useDashboardRankings({
    userBrackets: user.brackets,
    winnersData,
  });
  if (user.isLoading) return <Loader />;

  const firstName = user.name?.split(' ')[0];
  const hasBracketData = !!bracketData;

  return (
    <div className={styles.teamDashboard}>
      <p className={styles.name}>Welcome, {firstName}!</p>
      <RoundButtons />
      {hasBracketData ? (
        <BracketsTable {...user} brackets={bracketData} />
      ) : (
        <Loader />
      )}
    </div>
  );
}
