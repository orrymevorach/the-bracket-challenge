import BracketChallengeContainer from '@/components/bracket-challenge/bracket-challenge-container';
import Meta from '@/components/shared/head/head';
import { useConfig } from '@/context/config-context/config-context';
import { useSetInitialConfig } from '@/context/config-context/useSetInitialConfig';
import { SnowboardersProvider } from '@/context/snowboarders-context/snowboarders-context';
import { UserProvider } from '@/context/user-context/user-context';
import { getFeatureFlag, getPageLoadData } from '@/lib/contentful';
import { FEATURE_FLAGS, ROUTES } from '@/utils/constants';

export default function BracketChallengePage({ config }) {
  const { config: defaultConfig } = useConfig();
  useSetInitialConfig({
    ...defaultConfig,
    ...config,
  });
  return (
    <>
      <Meta />
      <UserProvider>
        <SnowboardersProvider>
          <BracketChallengeContainer />
        </SnowboardersProvider>
      </UserProvider>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: ROUTES.BRACKET_CHALLENGE,
  });

  const isDuelsSelectionsEnabled = await getFeatureFlag({
    name: FEATURE_FLAGS.IS_DUELS_SELECTIONS_ENABLED,
  });

  const isRevelstokeSelectionsEnabled = await getFeatureFlag({
    name: FEATURE_FLAGS.IS_REVELSTOKE_SELECTIONS_ENABLED,
  });

  const isSelkirkSelectionsEnabled = await getFeatureFlag({
    name: FEATURE_FLAGS.IS_SELKIRK_SELECTIONS_ENABLED,
  });

  const config = {
    isDuelsSelectionsEnabled,
    isRevelstokeSelectionsEnabled,
    isSelkirkSelectionsEnabled,
  };

  return {
    props: {
      ...pageLoadData,
      config,
    },
  };
}
