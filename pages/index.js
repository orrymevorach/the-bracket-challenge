import BracketChallenge from 'components/bracket-challenge/bracket-challenge';
import styles from './home.module.scss';

const currentUser = 'Orry'; // This will come from auth

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <h2 className={styles.welcomeText}>Welcome: {currentUser}!</h2>
      <BracketChallenge />
    </div>
  );
}
