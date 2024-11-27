import Link from 'next/link';
import styles from './Nav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/shared/button/button';
import { ROUTES } from '@/utils/constants';
import { useUser } from '@/context/user-context/user-context';
import Image from 'next/image';
import desktopDarkLogo from '@/public/logo-center.png';
import desktopLightLogo from '@/public/logo-center-white.png';
import mobileDarkLogo from '@/public/logo-bracket.png';
import mobileLightLogo from '@/public/logo-bracket-white.png';
import clsx from 'clsx';

import useWindowSize from '@/hooks/useWindowSize';

const getLinks = ({ user }) => [
  // {
  //   label: 'Schedule',
  //   href: '/schedule',
  // },
  // {
  //   label: 'Watch',
  //   href: '#',
  // },
  {
    label: user?.id ? 'Dashboard' : 'Join Now',
    href: user?.id ? ROUTES.DASHBOARD : ROUTES.LOGIN,
  },
];

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
  const loginHref = user?.id ? ROUTES.DASHBOARD : ROUTES.LOGIN;
  const links = getLinks({ user });
  const { isMobile } = useWindowSize();
  const logoTheme = isDark ? 'dark' : 'light';
  const logo = mapDeviceToLogo[isMobile ? 'mobile' : 'desktop'][logoTheme];
  return (
    <nav className={clsx(styles.nav, isFixed && styles.fixed)}>
      <Link href={ROUTES.HOME}>
        <Image src={logo} alt="logo" className={styles.logo} />
      </Link>
      {/* This is a placeholder for the logo */}
      {/* <ul className={styles.items}> */}
      <ul>
        {/* {links.map(({ label, href }) => {
          return (
            <li key={label} className={styles.navItem}>
              <Link href={href}>{label}</Link>
            </li>
          );
        })} */}
      </ul>
      <Button classNames={styles.userIcon} isNaked href={loginHref}>
        <FontAwesomeIcon icon={faUser} size="lg" color="white" />
      </Button>
    </nav>
  );
}
