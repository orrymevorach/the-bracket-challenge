import { useUser } from '@/context/user-context/user-context';
import styles from './layout.module.scss';
import Loader from '../loader/loader';
import Footer from '../footer/footer';
import RainbowBorder from './rainbow-border/rainbow-border';
import Nav from '../nav/nav';

export default function Layout({ children }) {
  const user = useUser();

  if (user.isLoading) return <Loader isFullPage />;

  return (
    <>
      <RainbowBorder />
      <div className={styles.layout}>
        <Nav />
        {children}
      </div>
      <Footer />
    </>
  );
}
