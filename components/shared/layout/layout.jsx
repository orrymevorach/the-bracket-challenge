import useUser from '@/context/user-context/useUser';
import Button from '../button/button';
import styles from './layout.module.scss';
import Loader from '../loader/loader';
import { COOKIES, ROUTES } from '@/utils/constants';
import { useRouter } from 'next/router';
import Footer from '../footer/footer';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { signOutOfFirebase } from '@/components/login/firebase-utils';

export default function Layout({ children }) {
  const user = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = router;
  const firstName = user.name?.split(' ')[0];
  if (user.isLoading) return <Loader isFullPage />;

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOutOfFirebase();
    Cookies.remove(COOKIES.UID);
    router.push(ROUTES.HOME);
  };

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.topContainer}>
          <p className={styles.name}>Hello, {firstName}!</p>
          <div className={styles.buttonsContainer}>
            {pathname !== ROUTES.DASHBOARD && (
              <Button classNames={styles.button} href={ROUTES.DASHBOARD}>
                Back to dashboard
              </Button>
            )}
            <Button isLoading={isLoading} handleClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
        {children}
      </div>
      <Footer />
    </>
  );
}
