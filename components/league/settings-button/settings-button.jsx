import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import useUser from '@/hooks/useUser';
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
          <p>
            <Link href={`${ROUTES.LEAGUE_SETTINGS}/${id}`}>
              Settings <FontAwesomeIcon icon={faGear} />
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
