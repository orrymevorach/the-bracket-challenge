import { WinnersProvider } from '@/context/winners-context/winners-context';
import Dashboard from '@/components/dashboard/dashboard';
import Meta from '@/components/shared/head/head';
import { UserProvider } from '@/context/user-context/user-context';
import { UserLeagueProvider } from '@/context/user-league-context/user-league-context';
// import Cookies from 'cookies';
// import { getUserLeagueData } from '@/lib/airtable';

export default function DashboardPage({ userLeagueData }) {
  return (
    <>
      <Meta title="Dashboard" />
      <UserProvider>
        {/* <WinnersProvider> */}
        {/* <UserLeagueProvider userLeagueData={userLeagueData}> */}
        <Dashboard />
        {/* </UserLeagueProvider> */}
        {/* </WinnersProvider> */}
      </UserProvider>
    </>
  );
}

// export async function getServerSideProps({ req, res }) {
//   const cookies = new Cookies(req, res);
//   const uid = cookies.get('uid');
//   const userLeagueData = await getUserLeagueData({ uid });

//   return {
//     props: { userLeagueData },
//   };
// }
