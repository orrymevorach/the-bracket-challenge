import { getLeagueMembers, joinLeague } from '@/lib/airtable';
import { useUser } from 'context/user-context/user-context';
import { ROUTES, topDawgCompetitionLeagueId } from '@/utils/constants';
import { useRouter } from 'next/router';
import Takeover from '@/components/shared/takeover/takeover';
import Button from '@/components/shared/button/button';
import styles from './join-public-league-takeover.module.scss';

export default function JoinPublicLeagueTakeover({ setShowTakeover }) {
  const user = useUser();
  const router = useRouter();

  const handleCreateNewBracket = async () => {
    const existingMembers = await getLeagueMembers({
      id: topDawgCompetitionLeagueId,
    });
    const existingMemberIds = existingMembers.map(({ id }) => id);
    const memberRecordIds = [...existingMemberIds, user.id];

    const response = await joinLeague({
      id: topDawgCompetitionLeagueId,
      memberRecordIds,
    });
    router.push(
      `${ROUTES.BRACKET_CHALLENGE}?leagueId=${topDawgCompetitionLeagueId}`
    );
  };

  return (
    <Takeover
      handleClose={() => setShowTakeover(false)}
      modalClassNames={styles.container}
    >
      <div className={styles.textContainer}>
        <h2 className={styles.heading}>The NST Open</h2>
        <p className={styles.subheading}>
          Earn your bragging rights by ranking at the top of the public
          leaderboard.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            This is an open league for any users that want to join
          </li>

          <li className={styles.listItem}>
            You can create a new bracket, or use an existing bracket that you
            already created in a different league
          </li>
        </ul>
      </div>
      <Button handleClick={handleCreateNewBracket}>Create Bracket</Button>
    </Takeover>
  );
}
