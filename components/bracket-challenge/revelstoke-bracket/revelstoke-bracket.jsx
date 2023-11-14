import BracketChallenge from '../bracket-challenge';
import { useSnowboarders } from '@/context/snowboarders-context/snowboarders-context';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';

export default function RevelstokeBracket() {
  const snowboarders = useSnowboarders();
  return (
    <MatchupDataProvider snowboarders={snowboarders.revelstoke}>
      <BracketChallenge />
    </MatchupDataProvider>
  );
}
