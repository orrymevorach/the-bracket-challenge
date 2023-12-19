import Button from '@/components/shared/button/button';
import styles from './create-bracket-prompt.module.scss';
import useUser from '@/context/user-context/useUser';
import { ROUTES } from '@/utils/constants';
import { useRouter } from 'next/router';

export default function CreateBracketPrompt({ brackets = null }) {
  const user = useUser();
  const router = useRouter();

  const currentUserHasBracket = brackets
    ? brackets.find(({ userName }) => user.name === userName[0])
    : null;
  const showPrompt = brackets !== null && !currentUserHasBracket;

  const leagueId = router.query.slug;

  return (
    <>
      {showPrompt && (
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
      )}
    </>
  );
}
