import { WinnersProvider } from '@/context/winners-context/winners-context';
import League from '@/components/league/league';
import { LeagueConfigProvider } from '@/context/league-config-context/league-config-context';
import { ROUTES } from '@/utils/constants';
import { getPageLoadData } from '@/lib/contentful';
import { getLeagueIds } from '@/lib/airtable';
import Meta from '@/components/shared/head/head';

export default function LeaguePage() {
  return (
    <>
      <Meta />
      <WinnersProvider>
        <LeagueConfigProvider>
          <League />
        </LeagueConfigProvider>
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

export async function getStaticPaths() {
  const leagues = await getLeagueIds();

  return {
    paths: leagues.map(({ id }) => `/league/${id}`),
    fallback: true,
  };
}
