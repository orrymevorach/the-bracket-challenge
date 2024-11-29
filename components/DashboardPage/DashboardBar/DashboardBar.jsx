import Wrapper from '@/components/shared/Wrapper/Wrapper';
import styles from './DashboardBar.module.scss';
import { useUser } from '@/context/user-context/user-context';

export default function DashboardBar({
  title = 'Dashboard',
  children,
  userToShow,
}) {
  const currentUser = useUser();
  const user = userToShow || currentUser;
  const firstInitial = user?.firstName?.charAt(0) || '';
  const lasInitial = user?.lastName?.charAt(0) || '';

  return (
    <div className={styles.container}>
      <Wrapper classNames={styles.innerContainer}>
        <div className={styles.initials}>
          <p>{`${firstInitial}${lasInitial}`}</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.dashboardText}>{title}</p>
          <p className={styles.username}>{user.username}</p>
        </div>
        {children}
      </Wrapper>
    </div>
  );
}
