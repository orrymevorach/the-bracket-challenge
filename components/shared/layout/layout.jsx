import useUser from '@/hooks/useUser';
import Button from '../button/button';
import styles from './layout.module.scss';
import Loader from '../loader/loader';
import { ROUTES } from '@/utils/constants';
import { useRouter } from 'next/router';
import Footer from '../footer/footer';

export default function Layout({ children }) {
  const user = useUser();
  const router = useRouter();
  const { pathname } = router;
  const firstName = user.name?.split(' ')[0];
  if (user.isLoading) return <Loader />;
  return (
    <div className={styles.layout}>
      <div className={styles.topContainer}>
        <p className={styles.name}>Hello, {firstName}!</p>
        <div className={styles.buttonsContainer}>
          {pathname !== ROUTES.DASHBOARD && (
            <Button classNames={styles.button} href={ROUTES.DASHBOARD}>
              Back to dashboard
            </Button>
          )}
          <Button>Log Out</Button>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
}
