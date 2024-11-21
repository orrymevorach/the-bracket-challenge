import Link from 'next/link';
import styles from './Nav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/shared/button/button';
import { ROUTES } from '@/utils/constants';

const links = [
  {
    label: 'Schedule',
    href: '/schedule',
  },
  {
    label: 'Watch',
    href: '#',
  },
  {
    label: 'Join Now',
    href: '/login',
  },
];

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div></div> {/* This is a placeholder for the logo */}
      <ul className={styles.items}>
        {links.map(({ label, href }) => {
          return (
            <li key={label} className={styles.navItem}>
              <Link href={href}>{label}</Link>
            </li>
          );
        })}
      </ul>
      <Button classNames={styles.userIcon} isNaked href={ROUTES.LOGIN}>
        <FontAwesomeIcon icon={faUser} size="lg" color="white" />
      </Button>
    </nav>
  );
}
