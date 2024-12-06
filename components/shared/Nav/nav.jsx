import { useUser } from '@/context/user-context/user-context';
import styles from './nav.module.scss';
import { COOKIES, ROUTES } from '@/utils/constants';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { signOutOfFirebase } from '@/components/LoginPage/firebase-utils';
import Button from '@/components/shared/Button/Button';
import { useWindowSize } from '@/context/window-size-context/window-size-context';
import MobileNav from './MobileNav/MobileNav';

export default function Nav() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const user = useUser();
  const { isMobile } = useWindowSize();

  const { pathname } = router;
  const firstName = user.name?.split(' ')[0];

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOutOfFirebase();
    Cookies.remove(COOKIES.UID);
    router.push(ROUTES.HOME);
  };
  return (
    <div className={styles.container}>
      <p className={styles.name}>Hey {firstName}!</p>
      {!isMobile ? (
        <nav className={styles.buttonsContainer}>
          {pathname !== ROUTES.DASHBOARD && (
            <Button classNames={styles.button} href={ROUTES.DASHBOARD}>
              Dashboard
            </Button>
          )}
          <Button isLoading={isLoading} handleClick={handleSignOut}>
            Sign Out
          </Button>
        </nav>
      ) : (
        <MobileNav handleSignOut={handleSignOut} />
      )}
    </div>
  );
}
