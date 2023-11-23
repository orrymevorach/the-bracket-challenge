import Button from '@/components/shared/button/button';
import styles from './create-bracket-prompt.module.scss';
import useUser from '@/context/user-context/useUser';

export default function CreateBracketPrompt({ brackets = null }) {
  const user = useUser();
  const currentUserHasBracket = brackets.find(
    ({ userName }) => user.name === userName[0]
  );
  const showPrompt = brackets.length && !currentUserHasBracket;

  return (
    <>
      {showPrompt && (
        <div className={styles.informationContainer}>
          <p className={styles.text}>
            Time to pick your winners! <br />
            Click the button below to set your bracket.
          </p>
          <Button isSecondary classNames={styles.createBracketButton}>
            Create Bracket
          </Button>
        </div>
      )}
    </>
  );
}
