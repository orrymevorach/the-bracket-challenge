import BracketSettings from '@/components/bracket-settings/bracket-settings';
import Meta from '@/components/shared/Head/Head';
import { LeagueConfigProvider } from '@/context/league-config-context/league-config-context';
import { UserProvider } from '@/context/user-context/user-context';
import { getAllBrackets } from '@/lib/airtable';
import { getPageLoadData } from '@/lib/contentful';
import { ROUTES } from '@/utils/constants';

export default function BracketSettingsPage() {
  return;
  return (
    <>
      <Meta title="Bracket Settings" />
      <UserProvider>
        <LeagueConfigProvider>
          <BracketSettings />
        </LeagueConfigProvider>
      </UserProvider>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
  const pageLoadData = await getPageLoadData({
    url: ROUTES.BRACKET_SETTINGS,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}

export async function getStaticPaths() {
  // const brackets = await getAllBrackets();
  const brackets = [];

  return {
    paths: brackets.map(({ id }) => `/bracket-settings/${id}`),
    fallback: true,
  };
}
