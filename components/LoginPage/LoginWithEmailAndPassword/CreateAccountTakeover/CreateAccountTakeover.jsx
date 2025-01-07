import Takeover from '@/components/shared/Takeover/Takeover';
import styles from './CreateAccountTakeover.module.scss';
import CreateUser from './CreateUser/CreateUser';
import { useRouter } from 'next/router';

export default function CreateAccountTakeover({ email, setIsCreatingNewUser }) {
  const router = useRouter();
  const handleClose = () => {
    setIsCreatingNewUser(false);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        newUser: null,
      },
    });
  };
  return (
    <>
      <Takeover classNames={styles.takeover} handleClose={handleClose} isDark>
        <CreateUser email={email} />
      </Takeover>
    </>
  );
}
