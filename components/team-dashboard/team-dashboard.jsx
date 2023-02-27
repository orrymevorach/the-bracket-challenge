import { createUser, getUser } from 'airtable-utils/member-utils';
import Button from 'components/button';
import { useAuth } from 'context/user-context/auth-context';
import { useEffect } from 'react';
import styles from './team-dashboard.module.scss';

export default function TeamDashboard() {
  const { user } = useAuth();
  useEffect(() => {
    const handleGetTeamDashboard = async () => {
      if (user) {
        const { uid } = user;
        const { userTeamData } = await getUser({ uid });
        if (!userTeamData) {
          await createUser({ uid });
        }
      }
    };
    return () => handleGetTeamDashboard();
  }, [user]);

  return (
    <div className={styles.teamDashboard}>
      <Button>Create League</Button>
      <Button>Join League</Button>
      <Button>Create/View Bracket</Button>
      {user && (
        <>
          <h3>Welcome {user.name}!</h3>
          <h3>Leagues:</h3>
          <ul>
            <li></li>
          </ul>
        </>
      )}
    </div>
  );
}
