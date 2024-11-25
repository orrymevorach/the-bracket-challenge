import Link from 'next/link';
import styles from './Nav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/shared/button/button';
import { ROUTES } from '@/utils/constants';
import { useUser } from '@/context/user-context/user-context';
import Image from 'next/image';
import desktopLogo from '@/public/logo-center.png';
import mobileLogo from '@/public/logo-bracket.png';
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

export default function Nav() {
  const user = useUser();
  const loginHref = user?.id ? ROUTES.DASHBOARD : ROUTES.LOGIN;
  const links = getLinks({ user });
  const { isMobile } = useWindowSize();
  const logo = isMobile ? mobileLogo : desktopLogo;
  return (
    <nav className={styles.nav}>
      <Image src={logo} alt="logo" className={styles.logo} />
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
