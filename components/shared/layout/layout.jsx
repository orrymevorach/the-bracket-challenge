import { useUser } from '@/context/user-context/user-context';
import styles from './layout.module.scss';
import Loader from '../loader/loader';
import Footer from '../footer/footer';
import RainbowBorder from './rainbow-border/rainbow-border';
import Nav from '../nav/nav';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useWindowSize } from '@/context/window-size-context/window-size-context';

export default function Layout({
  children,
  backButtonHref = '',
  backButtonText = '',
}) {
  const user = useUser();
  const { isMobile } = useWindowSize();

  if (user.isLoading) return <Loader isFullPage />;

  return (
    <>
      <RainbowBorder />
      <div className={styles.layout}>
        <Nav />
        {backButtonText && (
          <Link href={backButtonHref} className={styles.backButton}>
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              color="#fff"
              className={styles.chevron}
              size={isMobile ? 'xl' : 'lg'}
            />
            {!isMobile && <p>{backButtonText}</p>}
          </Link>
        )}

        {children}
      </div>
      <Footer />
    </>
  );
}
