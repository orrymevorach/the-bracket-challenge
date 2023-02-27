import { createUser, getUser } from 'airtable-utils/member-utils';
import Button from 'components/button';
import { useUser } from 'context/user-context/user-context';
import { useEffect } from 'react';
import styles from './team-dashboard.module.scss';

export default function TeamDashboard() {
  const { authData } = useUser();
  useEffect(() => {
    const handleGetTeamDashboard = async () => {
      if (authData) {
        const { uid } = authData;
        const { userTeamData } = await getUser({ uid });
        if (!userTeamData) {
          await createUser({ uid });
        }
      }
    };
    return () => handleGetTeamDashboard();
  }, [authData]);

  return (
    <div className={styles.teamDashboard}>
      <div className={styles.buttonContainer}>
        <Button>Create League</Button>
        <Button>Join League</Button>
        <Button>Create/View Bracket</Button>
      </div>
      {authData && (
        <>
          <h3>Welcome {authData.name}!</h3>
          <h3>Leagues:</h3>
          <ul>
            <li></li>
          </ul>
        </>
      )}
    </div>
  );
}
