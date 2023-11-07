import { useUser } from 'context/user-context/user-context';
import styles from './team-dashboard.module.scss';
import Loader from 'components/shared/loader/loader';
import BracketsTable from './brackets-table/brackets-table';

export default function TeamDashboard() {
  const user = useUser();

  if (user.isLoading) return <Loader />;

  const firstName = user.name?.split(' ')[0];
  const hasBrackets = user.brackets?.length;

  return (
    <div className={styles.teamDashboard}>
      <p className={styles.name}>Welcome, {firstName}!</p>
      {hasBrackets && <BracketsTable {...user} />}
    </div>
  );
}
