import BracketChallengeContainer from '@/components/bracket-challenge/bracket-challenge-container';
import { SnowboardersProvider } from '@/context/snowboarders-context/snowboarders-context';

export default function Bracket() {
  return (
    <SnowboardersProvider>
      <BracketChallengeContainer />
    </SnowboardersProvider>
  );
}
