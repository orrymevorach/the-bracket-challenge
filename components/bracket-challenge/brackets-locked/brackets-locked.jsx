import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './brackets-locked.module.scss';

export default function BracketsLocked({ currentRoundName }) {
  return (
    <div className={styles.lockedContainer}>
      <FontAwesomeIcon icon={faLock} color="#fff" className={styles.lock} />
      <p>{currentRoundName} brackets are locked</p>
    </div>
  );
}
