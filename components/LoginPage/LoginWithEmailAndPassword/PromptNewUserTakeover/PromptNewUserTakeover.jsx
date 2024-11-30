import Takeover from '@/components/shared/Takeover/Takeover';
import Button from '@/components/shared/Button/Button';
import styles from './PromptNewUserTakeover.module.scss';

export default function PromptNewUserTakeover({
  setIsUserPromptedToCreateAccount,
  setIsCreatingNewUser,
}) {
  const handleSubmit = () => {
    setIsUserPromptedToCreateAccount(false);
    setIsCreatingNewUser(true);
  };
  return (
    <Takeover handleClose={() => setIsUserPromptedToCreateAccount(false)}>
      <p className={styles.text}>
        We do not have an email associated with that email
      </p>
      <Button handleClick={handleSubmit} classNames={styles.button} isSecondary>
        Create Account
      </Button>
      <Button
        isLight
        handleClick={() => setIsUserPromptedToCreateAccount(false)}
      >
        Retry
      </Button>
    </Takeover>
  );
}
