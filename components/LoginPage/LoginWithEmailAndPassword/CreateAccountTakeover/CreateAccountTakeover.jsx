import Takeover from '@/components/shared/Takeover/Takeover';
import styles from './CreateAccountTakeover.module.scss';
import CreateUser from './CreateUser/CreateUser';

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
