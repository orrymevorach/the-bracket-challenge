import Button from 'components/button';
import { useUser } from 'context/user-context/user-context';
import styles from './team-dashboard.module.scss';
import Loader from 'components/loader/loader';
import Leagues from './leagues';
import { getUid } from 'utils/utils';

export default function TeamDashboard() {
  const uid = getUid();
  const { authData, isUserTeamDataLoading } = useUser();

  if (isUserTeamDataLoading) return <Loader />;

  const getHref = pathname => ({
    pathname,
    query: {
      uid,
    },
  });

  return (
    <div className={styles.teamDashboard}>
      <h3>Welcome {authData.name}!</h3>
      <div className={styles.buttonContainer}>
        <Button href={getHref('create-league')}>Create League</Button>
        <Button href={getHref('join-league')}>Join League</Button>
        <Button href="bracket">Create/View Bracket</Button>
      </div>
      <Leagues />
    </div>
  );
}
