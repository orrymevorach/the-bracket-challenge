import Login from 'components/login';
import TeamDashboard from 'components/team-dashboard';
import { useAuth } from 'context/user-context/auth-context';
import styles from './home.module.scss';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className={styles.homeContainer}>
      {!user ? <Login /> : <TeamDashboard />}
    </div>
  );
}
