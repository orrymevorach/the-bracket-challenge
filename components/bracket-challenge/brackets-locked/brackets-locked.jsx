import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './brackets-locked.module.scss';
import { useMatchups } from '@/context/matchup-context/matchup-context';

export default function BracketsLocked() {
  const { currentContest } = useMatchups();
  return (
    <div className={styles.lockedContainer}>
      <FontAwesomeIcon icon={faLock} color="#fff" className={styles.lock} />
      <p>{currentContest.name} brackets are locked</p>
    </div>
  );
}
