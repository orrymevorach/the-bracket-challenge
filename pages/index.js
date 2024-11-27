import HomePageLayout from '@/components/HomePage/Layout/Layout';
import Media from '@/components/HomePage/Media/Media';
import Nav from '@/components/HomePage/Nav/Nav';
import Meta from '@/components/shared/head/head';
import { UserProvider } from 'context/user-context/user-context';

export default function HomePage({ media = [] }) {
  return;
  return (
    <div>
      <Meta />
      <UserProvider>
        <HomePageLayout>
          <Nav isFixed isDark />
          <Media media={media} />
        </HomePageLayout>
      </UserProvider>
    </div>
  );
}
