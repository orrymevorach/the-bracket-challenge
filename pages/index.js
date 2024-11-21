import HomePageLayout from '@/components/HomePage/Layout/Layout';
import Media from '@/components/HomePage/Media/Media';
import Nav from '@/components/HomePage/Nav/Nav';
import Meta from '@/components/shared/head/head';
import { getMedia } from '@/lib/contentful';
import { UserProvider } from 'context/user-context/user-context';

export default function HomePage({ media = [] }) {
  return (
    <div>
      <Meta />
      <UserProvider>
        <HomePageLayout>
          <Nav />
          <Media media={media} />
        </HomePageLayout>
      </UserProvider>
    </div>
  );
}

export async function getStaticProps() {
  const media = await getMedia();
  return {
    props: { media },
  };
}
