import Link from 'next/link';
import styles from './matchups-not-available.module.scss';

export default function MatchupsNotAvailable({ currentRoundName }) {
  return (
    <div>
      <p className={styles.matchupsNotAvailableHeading}>Not Available</p>
      <p className={styles.matchupsNotAvailableText}>
        Selections for {currentRoundName} are not yet available. Check out{' '}
        <Link
          href="https://www.instagram.com/nstbracketchallenge/"
          target="_blank"
          className={styles.link}
        >
          @nstbracketchallenge
        </Link>{' '}
        for updates.
      </p>
    </div>
  );
}
