import Form from '@/components/contact/form/form';
import Meta from '@/components/shared/head/head';
import Layout from '@/components/shared/layout/layout';
import ParticlesContainer from '@/components/shared/particles/particles';
import { getPageLoadData } from '@/lib/contentful';
import Login from 'components/login/login';
import { UserProvider } from 'context/user-context/user-context';
import { ROUTES } from 'utils/constants';

export default function LoginPage() {
  return (
    <div>
      <Meta title="Contact Us" />
      <UserProvider>
        <Layout>
          <Form />
        </Layout>
      </UserProvider>
    </div>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: ROUTES.CONTACT,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}
