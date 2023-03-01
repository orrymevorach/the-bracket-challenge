import Button from 'components/button';
import { useUser } from 'context/user-context/user-context';
import styles from './team-dashboard.module.scss';
import Loader from 'components/loader/loader';
import Leagues from './leagues';
import { useEffect } from 'react';
import { getUid } from 'utils/utils';
import { createBracket } from 'airtable-utils/member-utils';

const useBracket = ({ userTeamData, authData }) => {
  useEffect(() => {
    const handleLoadBracket = async () => {
      if (userTeamData) {
        const uid = getUid();
        const { brackets } = userTeamData;
        if (brackets.length === 0) {
          await createBracket({
            name: authData?.name,
            memberId: userTeamData.id,
            uid,
          });
        }
      }
    };
    handleLoadBracket();
  }, [userTeamData, authData]);
};

export default function TeamDashboard() {
  const { authData, isUserTeamDataLoading, userTeamData } = useUser();
  useBracket({ userTeamData, authData });

  if (isUserTeamDataLoading) return <Loader />;

  const hasBracket = !!userTeamData.brackets?.length;
  const buttonText = hasBracket ? 'View Bracket' : 'Create Bracket';

  return (
    <div className={styles.teamDashboard}>
      <h3>Welcome {authData.name}!</h3>
      <div className={styles.buttonContainer}>
        <Button href="create-league">Create League</Button>
        <Button href="join-league">Join League</Button>
        <Button handleClick={() => (window.location = '/bracket')}>
          {buttonText}
        </Button>
      </div>
      <Leagues />
    </div>
  );
}
