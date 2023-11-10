import { WinnersProvider } from '@/context/winners-context/winners-context';
import League from '@/components/league/league';

export default function LeaguePage() {
  return (
    <WinnersProvider>
      <League />
    </WinnersProvider>
  );
}
