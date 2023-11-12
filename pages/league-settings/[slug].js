import LeagueSettings from '@/components/league-settings/league-settings';
import { LeagueConfigProvider } from '@/context/league-config-context/league-config-context';

export default function LeaguePage() {
  return (
    <LeagueConfigProvider>
      <LeagueSettings />
    </LeagueConfigProvider>
  );
}
