import Button from '@/components/shared/Button/Button';
import styles from './join-public-league-prompt.module.scss';

export default function JoinPublicLeaguePrompt({ setShowTakeover = false }) {
  return (
    <div className={styles.informationContainer}>
      <p className={styles.heading}>The NST Open</p>
      <p className={styles.text}>
        Join our public league and see how your bracket ranks against the
        competition!
      </p>
      <Button
        isPeach
        classNames={styles.createBracketButton}
        handleClick={() => setShowTakeover(true)}
      >
        Join Now
      </Button>
    </div>
  );
}
