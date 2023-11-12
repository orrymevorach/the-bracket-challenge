import styles from './league-settings.module.scss';
import useUser from '@/hooks/useUser';
import LeaguePageLayout from '../league/league-page-layout/league-page-layout';
import { useLeagueConfig } from '@/context/league-config-context/league-config-context';

export default function LeagueSettings() {
  // const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const { name, admin } = useLeagueConfig();

  const leagueAdmin = admin?.length > 0 && admin[0].id;
  const isAdmin = leagueAdmin && user.id === leagueAdmin;

  return <LeaguePageLayout title="League Settings:"></LeaguePageLayout>;
}
