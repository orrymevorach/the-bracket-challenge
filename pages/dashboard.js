import { WinnersProvider } from '@/context/winners-context/winners-context';
import Dashboard from '@/components/dashboard/dashboard';

export default function DashboardPage() {
  return (
    <WinnersProvider>
      <Dashboard />
    </WinnersProvider>
  );
}
