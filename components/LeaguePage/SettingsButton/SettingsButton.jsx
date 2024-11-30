import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useLeagueConfig } from '@/context/league-config-context/league-config-context';
import styles from './SettingsButton.module.scss';
import { ROUTES } from '@/utils/constants';

export default function SettingsButton() {
  const { id } = useLeagueConfig();
  return (
    <Link
      href={`${ROUTES.LEAGUE_SETTINGS}/${id}?leagueId=${id}`}
      className={styles.button}
    >
      <p className={styles.text}>Admin Settings</p>{' '}
      <FontAwesomeIcon icon={faGear} size="sm" />
    </Link>
  );
}
