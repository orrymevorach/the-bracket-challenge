import BracketChallengeContainer from '@/components/bracket-challenge/bracket-challenge-container';
import Meta from '@/components/shared/head/head';
import { SnowboardersProvider } from '@/context/snowboarders-context/snowboarders-context';
import { getPageLoadData } from '@/lib/contentful';
import { ROUTES } from '@/utils/constants';

export default function BracketChallengePage() {
  return (
    <>
      <Meta />
      <SnowboardersProvider>
        <BracketChallengeContainer />
      </SnowboardersProvider>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: ROUTES.BRACKET_CHALLENGE,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}
