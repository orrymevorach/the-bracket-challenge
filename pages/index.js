import HomePageLayout from '@/components/HomePage/Layout/Layout';
import Media from '@/components/HomePage/Media/Media';
import Nav from '@/components/shared/Nav/Nav';
import Footer from '@/components/shared/Footer/Footer';
import Meta from '@/components/shared/Head/Head';
import { getMedia } from '@/lib/contentful';
import { UserProvider } from 'context/user-context/user-context';

export default function HomePage({ media = [] }) {
  return (
    <div>
      <Meta />
      <UserProvider>
        <HomePageLayout>
          <Nav isFixed isDark />
          <Media media={media} />
        </HomePageLayout>
        <Footer hideMarginTop />
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
