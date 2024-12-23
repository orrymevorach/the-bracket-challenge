import { useUser } from '@/context/user-context/user-context';
import styles from './Layout.module.scss';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';
// import Nav from '../nav/nav';
import Nav from '@/components/HomePage/Nav/Nav';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useWindowSize } from '@/context/window-size-context/window-size-context';
import Wrapper from '../Wrapper/Wrapper';

export default function Layout({
  children,
  backButtonHref = '',
  backButtonText = '',
  isDark = false,
  isFixed = false,
  removeWrapper = false,
}) {
  const user = useUser();
  const { isMobile } = useWindowSize();

  if (user?.isLoading) return <Loader isFullPage />;

  const WrapperComponent = removeWrapper ? 'div' : Wrapper;

  return (
    <div className={styles.layout}>
      <Nav isDark={isDark} isFixed={isFixed} />
      <WrapperComponent>
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
      </WrapperComponent>
      <Footer />
    </div>
  );
}
