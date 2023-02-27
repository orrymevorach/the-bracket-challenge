import BracketChallenge from 'components/bracket-challenge/bracket-challenge';
import styles from './home.module.scss';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <BracketChallenge />
    </div>
  );
}
