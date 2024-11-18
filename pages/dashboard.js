import { WinnersProvider } from '@/context/winners-context/winners-context';
import Dashboard from '@/components/dashboard/dashboard';
import Meta from '@/components/shared/head/head';
import { UserProvider } from '@/context/user-context/user-context';
import { UserLeagueProvider } from '@/context/user-league-context/user-league-context';

export default function DashboardPage() {
  return (
    <>
      <Meta title="Dashboard" />
      <UserProvider>
        <WinnersProvider>
          <UserLeagueProvider>
            <Dashboard />
          </UserLeagueProvider>
        </WinnersProvider>
      </UserProvider>
    </>
  );
}
