import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import useUser from '@/context/user-context/useUser';
import { useLeagueConfig } from '@/context/league-config-context/league-config-context';
import styles from './settings-button.module.scss';
import { ROUTES } from '@/utils/constants';

export default function SettingsButton() {
  const { admin, id } = useLeagueConfig();
  const user = useUser();
  const leagueAdmin = admin?.length > 0 && admin[0].id;
  const isAdmin = leagueAdmin && user.id === leagueAdmin;
  return (
    <>
      {isAdmin && (
        <div className={styles.leagueSettingsContainer}>
          <Link
            href={`${ROUTES.LEAGUE_SETTINGS}/${id}`}
            className={styles.button}
          >
            <p className={styles.text}>Settings</p>{' '}
            <FontAwesomeIcon icon={faGear} size="lg" />
          </Link>
        </div>
      )}
    </>
  );
}
