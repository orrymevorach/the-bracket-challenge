import { createUser, getUser } from 'airtable-utils/member-utils';
import Button from 'components/button';
import { useUser } from 'context/user-context/user-context';
import { useEffect } from 'react';
import styles from './team-dashboard.module.scss';
import { useRouter } from 'next/router';

export default function TeamDashboard() {
  const router = useRouter();
  const {
    authData,
    airtableRecordData: { setUserAirtableRecordId },
  } = useUser();

  useEffect(() => {
    const handleGetTeamDashboard = async () => {
      if (authData) {
        const { uid } = authData;
        const { userTeamData } = await getUser({ uid });

        if (userTeamData) {
          setUserAirtableRecordId(userTeamData.id);
        } else {
          const { airtableRecordId } = await createUser({ uid });
          setUserAirtableRecordId(airtableRecordId);
        }
      }
    };
    return () => handleGetTeamDashboard();
  }, [authData, setUserAirtableRecordId]);

  if (!authData) return;

  return (
    <div className={styles.teamDashboard}>
      <h3>Welcome {authData.name}!</h3>
      <div className={styles.buttonContainer}>
        <Button handleClick={() => router.push('/create-league')}>
          Create League
        </Button>
        <Button handleClick={() => router.push('/join-league')}>
          Join League
        </Button>
        <Button>Create/View Bracket</Button>
      </div>
    </div>
  );
}
