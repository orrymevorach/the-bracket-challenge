import Button from 'components/button';
import { useUser } from 'context/user-context/user-context';
import styles from './team-dashboard.module.scss';
import Loader from 'components/loader/loader';
import Leagues from './leagues';

export default function TeamDashboard() {
  const { authData, isUserTeamDataLoading, userTeamData } = useUser();

  if (isUserTeamDataLoading) return <Loader />;

  const hasBracket = !!userTeamData.brackets?.length;
  const buttonText = hasBracket ? 'View Bracket' : 'Create Bracket';

  return (
    <div className={styles.teamDashboard}>
      <h3>Welcome {authData.name}!</h3>
      <div className={styles.buttonContainer}>
        <Button href="/create-league">Create League</Button>
        <Button href="/join-league">Join League</Button>
        <Button href="/bracket">{buttonText}</Button>
      </div>
      <Leagues />
    </div>
  );
}
