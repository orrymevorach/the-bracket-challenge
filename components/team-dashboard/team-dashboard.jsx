import Button from 'components/shared/button/button';
import { useUser } from 'context/user-context/user-context';
import styles from './team-dashboard.module.scss';
import Loader from 'components/shared/loader/loader';
import Leagues from './leagues/leagues';

export default function TeamDashboard() {
  const user = useUser();
  const firstName = user?.name?.split(' ')[0];

  if (user.isLoading) return <Loader />;

  return (
    <div className={styles.teamDashboard}>
      <p>Welcome {firstName}!</p>
      <div className={styles.buttonContainer}>
        <Button href="/create-league">Create League</Button>
        <Button href="/join-league">Join League</Button>
      </div>
      <Leagues />
    </div>
  );
}
