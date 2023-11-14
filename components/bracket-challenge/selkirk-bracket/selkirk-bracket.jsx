import BracketChallenge from '../bracket-challenge';
import { useSnowboarders } from '@/context/snowboarders-context/snowboarders-context';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';
import { ROUND_NAMES } from '@/utils/constants';

export default function SelkirkBracket() {
  const snowboarders = useSnowboarders();
  return (
    <MatchupDataProvider snowboarders={snowboarders.selkirk}>
      <BracketChallenge currentRound={ROUND_NAMES.SELKIRK} />
    </MatchupDataProvider>
  );
}
