import { WinnersProvider } from '@/context/winners-context/winners-context';
import League from '@/components/league/league';
import { LeagueConfigProvider } from '@/context/league-config-context/league-config-context';

export default function LeaguePage() {
  return (
    <WinnersProvider>
      <LeagueConfigProvider>
        <League />
      </LeagueConfigProvider>
    </WinnersProvider>
  );
}
