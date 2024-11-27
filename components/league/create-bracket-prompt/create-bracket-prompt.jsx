import Button from '@/components/shared/button/button';
import styles from './create-bracket-prompt.module.scss';
import { ROUTES } from '@/utils/constants';
import { useRouter } from 'next/router';

export default function CreateBracketPrompt() {
  const router = useRouter();
  const leagueId = router.query.leagueId;

  return (
    <div className={styles.informationContainer}>
      <p className={styles.text}>
        Time to pick your winners! <br />
        Click the button below to set your bracket.
      </p>
      <Button
        isSecondary
        classNames={styles.createBracketButton}
        href={`${ROUTES.BRACKET_CHALLENGE}?leagueId=${leagueId}`}
      >
        Create Bracket
      </Button>
    </div>
  );
}
