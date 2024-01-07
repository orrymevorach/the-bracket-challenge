import styles from './league.module.scss';
import useGetLeagueRankings from '@/components/league/useGetLeagueRankings';
import LeagueRankingsTable from '@/components/league/league-rankings-table/league-rankings-table';
import LeaguePageLayout from './league-page-layout/league-page-layout';
import SettingsButton from './settings-button/settings-button';
import CreateBracketPrompt from './create-bracket-prompt/create-bracket-prompt';
import { useLeagueConfig } from '@/context/league-config-context/league-config-context';
import { useUser } from '@/context/user-context/user-context';

export const ROUNDS = [
  {
    displayName: 'Overall',
    name: 'Overall',
  },
  {
    displayName: 'NST Duels',
    name: 'Duels',
  },
  {
    displayName: 'Revelstoke Mountain Resort',
    name: 'Revelstoke',
  },
  {
    displayName: 'Selkirk Tangiers',
    name: 'Selkirk',
  },
];

export default function League() {
  const { bracketsSortedByRankings } = useGetLeagueRankings();
  const hasBracketData =
    !!bracketsSortedByRankings && bracketsSortedByRankings.length > 0;

  const { admin } = useLeagueConfig();
  const user = useUser();
  const leagueAdmin = admin?.length > 0 && admin[0].id;
  const isAdmin = leagueAdmin && user.id === leagueAdmin;

  return (
    <LeaguePageLayout title="League Rankings:">
      {hasBracketData ? (
        <div className={styles.mainContentContainer}>
          {isAdmin && <SettingsButton />}
          <LeagueRankingsTable leagueData={bracketsSortedByRankings} />
        </div>
      ) : (
        <div className={styles.mainContentContainer}>
          {isAdmin && <SettingsButton />}
          <CreateBracketPrompt brackets={bracketsSortedByRankings} />
        </div>
      )}
    </LeaguePageLayout>
  );
}
