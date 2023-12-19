import ComingSoon from '@/components/coming-soon/coming-soon';
import Meta from '@/components/shared/head/head';
import Loader from '@/components/shared/loader/loader';
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
    const isAdmin = router.query.admin === 'true';
    if (isAdmin || !showComingSoonPage) {
      router.push('/login');
    }
  }, [router, showComingSoonPage]);

  if (showLoader) return <Loader isFullPage />;

  return (
    <>
      <Meta />
      <ComingSoon />
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
