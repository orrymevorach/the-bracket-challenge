import BracketChallengeContainer from '@/components/bracket-challenge/bracket-challenge-container';
import Meta from '@/components/shared/Head/Head';
import { useConfig } from '@/context/config-context/config-context';
import { useSetInitialConfig } from '@/context/config-context/useSetInitialConfig';
import { LeagueConfigProvider } from '@/context/league-config-context/league-config-context';
import { UserProvider } from '@/context/user-context/user-context';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';

const config = {
  isDuelsSelectionsEnabled: true,
  isRevelstokeSelectionsEnabled: true,
  isSelkirkSelectionsEnabled: true,
  showDuelsMatchups: true,
  showRevelstokeMatchups: true,
  showSelkirkMatchups: true,
};

export default function BracketChallengePage() {
  const { config: defaultConfig } = useConfig();
  useSetInitialConfig({
    ...defaultConfig,
    ...config,
  });
  return (
    <>
      <Meta title="Bracket Challenge" />
      <UserProvider>
        <LeagueConfigProvider>
          <MatchupDataProvider>
            <BracketChallengeContainer />
          </MatchupDataProvider>
        </LeagueConfigProvider>
      </UserProvider>
    </>
  );
}
