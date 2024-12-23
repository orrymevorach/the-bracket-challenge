import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import styles from './MobileNav.module.scss';
import clsx from 'clsx';
import { ROUTES } from '@/utils/constants';
import Button from '@/components/shared/Button/Button';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function MobileNav({ handleSignOut }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const router = useRouter();

  const isBracketChallengePage = router.pathname.includes(
    ROUTES.BRACKET_CHALLENGE
  );
  const isDashboardPage = router.pathname === ROUTES.DASHBOARD;
  return (
    <>
      <div className={styles.hamburger}>
        <HamburgerMenu
          hamburgerMenuColor="white"
          setIsOpen={setIsMobileNavOpen}
        />
      </div>

      {isMobileNavOpen && (
        <>
          <div className={clsx(styles.mobileNav)}>
            {isBracketChallengePage && (
              <Button
                href={ROUTES.DASHBOARD}
                isSmall
                classNames={styles.dashboardButton}
              >
                Dashboard
              </Button>
            )}
            {isDashboardPage && (
              <Button handleClick={handleSignOut} isSmall>
                <p>Sign Out</p>
              </Button>
            )}
          </div>
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className={styles.overlay}
          ></button>
        </>
      )}
    </>
  );
}
