import { getPageLoadData } from '@/lib/contentful';
import { ROUTES } from 'utils/constants';
import matchup from 'public/matchup.png';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div>
      <Image src={matchup} alt="" />
    </div>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: ROUTES.LOGIN,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}
