import Link from 'next/link';
import styles from './matchups-not-available.module.scss';
import { useMatchups } from '@/context/matchup-context/matchup-context';

export default function MatchupsNotAvailable() {
  const { currentContest } = useMatchups();
  return (
    <div>
      <p className={styles.matchupsNotAvailableHeading}>Not Available</p>
      <p className={styles.matchupsNotAvailableText}>
        Selections for {currentContest?.name} are not yet available. Check out{' '}
        <Link
          href="https://www.instagram.com/the_bracketchallenge/"
          target="_blank"
          className={styles.link}
        >
          @the_bracketchallenge
        </Link>{' '}
        for updates.
      </p>
    </div>
  );
}
