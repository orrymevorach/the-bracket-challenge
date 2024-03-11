import { WinnersProvider } from '@/context/winners-context/winners-context';
import Dashboard from '@/components/dashboard/dashboard';
import { getPageLoadData } from '@/lib/contentful';
import { ROUTES } from '@/utils/constants';
import Meta from '@/components/shared/head/head';
import { UserProvider } from '@/context/user-context/user-context';
import { getAllBrackets } from '@/lib/airtable';
import { getTopTenBrackets } from '@/components/dashboard/bracket-ranking-utils';
import { UserLeagueProvider } from '@/context/user-league-context/user-league-context';

export default function DashboardPage({ overallRankingsData = [] }) {
  return (
    <>
      <Meta title="Dashboard" />
      <UserProvider>
        <WinnersProvider>
          <UserLeagueProvider>
            <Dashboard overallRankingsData={overallRankingsData} />
          </UserLeagueProvider>
        </WinnersProvider>
      </UserProvider>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: ROUTES.LEAGUE,
  });

  // const brackets = await getAllBrackets();
  // const overallRankingsData = getTopTenBrackets({ brackets });

  return {
    props: {
      ...pageLoadData,
      // overallRankingsData,
    },
  };
}
