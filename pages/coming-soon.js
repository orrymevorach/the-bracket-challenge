import ComingSoon from '@/components/coming-soon/coming-soon';
import Meta from '@/components/shared/head/head';
import { getPageLoadData } from '@/lib/contentful';
import { ROUTES } from '@/utils/constants';

export default function ComingSoonPage() {
  return (
    <>
      <Meta />
      <ComingSoon />
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: ROUTES.COMING_SOON,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}
