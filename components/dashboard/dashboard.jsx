import { useUser } from 'context/user-context/user-context';
import styles from './dashboard.module.scss';
import Loader from 'components/shared/loader/loader';
import UserBracketsTable from './user-brackets-table/user-brackets-table';
import useDashboardRankings from './useDashboardRankings';
import { useWinners } from '@/context/winners-context/winners-context';
import { ROUNDS } from '../league/round-buttons/round-buttons';
import Layout from '../shared/layout/layout';

export default function Dashboard() {
  const user = useUser();
  const winnersData = useWinners();
  const { bracketData } = useDashboardRankings({
    userBrackets: user.brackets,
    winnersData,
  });
  if (user.isLoading) return <Loader />;

  const hasBracketData = !!bracketData;

  return (
    <Layout>
      <p className={styles.heading}>Your Leagues</p>
      {hasBracketData ? (
        <UserBracketsTable
          {...user}
          brackets={bracketData}
          currentRound={ROUNDS[0].name}
        />
      ) : (
        <Loader isFullPage={false} classNames={styles.loader} />
      )}
    </Layout>
  );
}
