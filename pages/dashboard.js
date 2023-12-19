import { WinnersProvider } from '@/context/winners-context/winners-context';
import Dashboard from '@/components/dashboard/dashboard';
import { getPageLoadData } from '@/lib/contentful';
import { ROUTES } from '@/utils/constants';
import Meta from '@/components/shared/head/head';

export default function DashboardPage() {
  return (
    <>
      <Meta />
      <WinnersProvider>
        <Dashboard />
      </WinnersProvider>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: ROUTES.LEAGUE,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}
