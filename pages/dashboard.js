import { WinnersProvider } from '@/context/winners-context/winners-context';
import TeamDashboard from 'components/team-dashboard/team-dashboard';

export default function Dashboard() {
  return (
    <WinnersProvider>
      <TeamDashboard />
    </WinnersProvider>
  );
}
