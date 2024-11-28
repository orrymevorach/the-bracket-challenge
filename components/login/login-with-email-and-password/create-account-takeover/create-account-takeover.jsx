import Takeover from '@/components/shared/takeover/takeover';
import styles from './create-account-takeover.module.scss';
import CreateUser from './create-user/create-user';

export default function CreateAccountTakeover({ email, setIsCreatingNewUser }) {
  return (
    <>
      <Takeover
        classNames={styles.takeover}
        handleClose={() => setIsCreatingNewUser(false)}
        isDark
      >
        <CreateUser email={email} />
      </Takeover>
    </>
  );
}
