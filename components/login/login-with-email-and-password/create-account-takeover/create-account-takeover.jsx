import Takeover from '@/components/shared/takeover/takeover';
import styles from './create-account-takeover.module.scss';
import { useState } from 'react';
import Button from '@/components/shared/button/button';
import CreateUser from './create-user';

export default function CreateAccountTakeover({ email, setIsCreatingNewUser }) {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  return (
    <>
      <Takeover classNames={styles.takeover}>
        {isCreatingAccount ? (
          <CreateUser email={email} />
        ) : (
          <>
            <p className={styles.text}>
              We do not have an email associated with that email
            </p>
            <Button
              handleClick={() => setIsCreatingAccount(true)}
              classNames={styles.button}
            >
              Create Account
            </Button>
            <Button isLight handleClick={() => setIsCreatingNewUser(false)}>
              Retry
            </Button>
          </>
        )}
      </Takeover>
    </>
  );
}
