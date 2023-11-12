import Button from '@/components/shared/button/button';
import styles from './create-bracket-prompt.module.scss';
import useUser from '@/hooks/useUser';

export default function CreateBracketPrompt({ brackets = [] }) {
  const user = useUser();
  const currentUserHasBracket = brackets.find(
    ({ userName }) => user.name === userName[0]
  );

  return (
    <>
      {!currentUserHasBracket && (
        <div className={styles.informationContainer}>
          <p>
            Time to pick your winners! Click the button below to set your
            bracket.
          </p>
          <Button classNames={styles.createBracketButton}>
            Create Bracket
          </Button>
        </div>
      )}
    </>
  );
}
