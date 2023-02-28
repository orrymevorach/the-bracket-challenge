import Login from 'components/login';
import { useUser } from 'context/user-context/user-context';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from './home.module.scss';

export default function Home() {
  const { authData } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (authData) {
      router.push({
        pathname: '/dashboard',
        query: {
          uid: authData.uid,
        },
      });
    }
  }, [authData, router]);
  return (
    <div className={styles.homeContainer}>
      <Login />
    </div>
  );
}
