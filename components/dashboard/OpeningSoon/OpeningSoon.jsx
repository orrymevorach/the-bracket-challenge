import Button from '@/components/shared/button/button';
import styles from './OpeningSoon.module.scss';

export default function OpeningSoon() {
  return (
    <div className={styles.informationContainer}>
      <p className={styles.heading}>The Bracket CHallenge will open soon...</p>
      <p className={styles.text}>
        Brackets are currently closed as we eagerly anticipate matchup
        announcements for the 2025 season. We will notify you once it is time to
        make your picks!
      </p>
    </div>
  );
}
