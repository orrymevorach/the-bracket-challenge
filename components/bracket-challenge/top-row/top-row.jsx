import styles from './top-row.module.scss';
import { useUser } from '@/context/user-context/user-context';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useMatchups } from '@/context/matchup-context/matchup-context';
import { useRouter } from 'next/router';

export default function TopRow() {
  const { bracket } = useMatchups();
  const user = useUser();
  const router = useRouter();
  const { leagueId, bracketId } = router.query;

  const isCurrentUsersBrackets = user?.brackets?.includes(bracketId);

  return (
    <div className={styles.topContainer}>
      <div>
        <p className={styles.leagueName}>{bracket.name}</p>
      </div>
      {isCurrentUsersBrackets && (
        <Link
          href={`/bracket-settings/${bracketId}?bracketId=${bracketId}&leagueId=${leagueId}`}
          className={styles.button}
        >
          <p className={styles.text}>Settings</p>{' '}
          <FontAwesomeIcon icon={faGear} size="sm" />
        </Link>
      )}
    </div>
  );
}
