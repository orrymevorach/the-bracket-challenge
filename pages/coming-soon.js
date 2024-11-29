import ComingSoon from '@/components/coming-soon/coming-soon';
import Meta from '@/components/shared/Head/Head';
import Loader from '@/components/shared/Loader/Loader';
import ParticlesContainer from '@/components/shared/particles/particles';
import { getFeatureFlag, getPageLoadData } from '@/lib/contentful';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FEATURE_FLAGS, ROUTES } from 'utils/constants';

export default function Home({ showComingSoonPage }) {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!showComingSoonPage) {
      router.push('/login');
    }
  }, [router, showComingSoonPage]);

  if (showLoader) return <Loader isFullPage />;

  return (
    <>
      <Meta />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <ParticlesContainer />
        <ComingSoon />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: ROUTES.HOME,
  });

  const showComingSoonPage = await getFeatureFlag({
    name: FEATURE_FLAGS.SHOW_COMING_SOON_PAGE,
  });

  return {
    props: {
      ...pageLoadData,
      showComingSoonPage,
    },
  };
}
