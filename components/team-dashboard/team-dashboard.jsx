import Button from 'components/button';
import { useUser } from 'context/user-context/user-context';
import styles from './team-dashboard.module.scss';
import { useRouter } from 'next/router';
import Loader from 'components/loader/loader';
import Leagues from './leagues';

export default function TeamDashboard() {
  const router = useRouter();
  const uid = router.query.uid;
  const { authData, isUserTeamDataLoading } = useUser();

  if (isUserTeamDataLoading) return <Loader />;

  const getHref = pathname => ({
    pathname,
    query: {
      uid: uid,
    },
  });

  return (
    <div className={styles.teamDashboard}>
      <h3>Welcome {authData.name}!</h3>
      <div className={styles.buttonContainer}>
        <Button href={getHref('create-league')}>Create League</Button>
        <Button href={getHref('join-league')}>Join League</Button>
        <Button>Create/View Bracket</Button>
      </div>
      <Leagues />
    </div>
  );
}
