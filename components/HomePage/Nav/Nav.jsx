import Link from 'next/link';
import styles from './Nav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/shared/Button/Button';
import { COOKIES, ROUTES } from '@/utils/constants';
import { useUser } from '@/context/user-context/user-context';
import Image from 'next/image';
import desktopDarkLogo from '@/public/logo-center.png';
import desktopLightLogo from '@/public/logo-center-white.png';
import mobileDarkLogo from '@/public/logo-bracket.png';
import mobileLightLogo from '@/public/logo-bracket-white.png';
import clsx from 'clsx';
import useWindowSize from '@/hooks/useWindowSize';
import { useRouter } from 'next/router';
import { signOutOfFirebase } from '@/components/LoginPage/firebase-utils';
import Cookies from 'js-cookie';

const mapDeviceToLogo = {
  mobile: {
    light: mobileLightLogo,
    dark: mobileDarkLogo,
  },
  desktop: {
    light: desktopLightLogo,
    dark: desktopDarkLogo,
  },
};

export default function Nav({ isDark, isFixed }) {
  const user = useUser();
  const router = useRouter();
  const isHomePage = router.pathname === ROUTES.HOME;
  const isBracketChallengePage = router.pathname.includes(
    ROUTES.BRACKET_CHALLENGE
  );
  const buttonText = user?.id ? 'Sign In' : 'Sign Up';

  const loginHref = user?.id ? ROUTES.DASHBOARD : ROUTES.LOGIN;
  const { isMobile } = useWindowSize();
  const logoTheme = isDark ? 'dark' : 'light';
  const logo = mapDeviceToLogo[isMobile ? 'mobile' : 'desktop'][logoTheme];

  const handleSignOut = async () => {
    await signOutOfFirebase();
    Cookies.remove(COOKIES.UID);
    Cookies.remove(COOKIES.USER_RECORD_ID);
    window.location = ROUTES.HOME;
  };

  return (
    <nav className={clsx(styles.nav, isFixed && styles.fixed)}>
      <Link href={ROUTES.HOME}>
        <Image src={logo} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles.buttonsContainer}>
        {isBracketChallengePage && (
          <Button
            href={ROUTES.DASHBOARD}
            isSmall
            classNames={styles.dashboardButton}
          >
            Dashboard
          </Button>
        )}
        {isHomePage ? (
          <Button href={loginHref}>
            <p className={styles.signInText}>{buttonText}</p>
            <div classNames={styles.userIcon}>
              <FontAwesomeIcon icon={faUser} size="lg" color="white" />
            </div>
          </Button>
        ) : (
          <Button handleClick={handleSignOut} isSmall>
            <p>Sign Out</p>
          </Button>
        )}
      </div>
    </nav>
  );
}
