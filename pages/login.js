import Meta from '@/components/shared/head/head';
import { getPageLoadData } from '@/lib/airtable';
import Login from 'components/login/login';
import { UserProvider } from 'context/user-context/user-context';

export default function LoginPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Meta />
      <UserProvider>
        <Login />
      </UserProvider>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { user } = await getPageLoadData(context);
  if (user) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
