import BracketChallengeContainer from '@/components/bracket-challenge/bracket-challenge-container';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';

export default function Bracket() {
  return (
    <MatchupDataProvider>
      <BracketChallengeContainer />
    </MatchupDataProvider>
  );
}
