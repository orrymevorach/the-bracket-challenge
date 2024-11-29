import League from '@/components/league/league';
import Meta from '@/components/shared/Head/Head';
import { UserProvider } from '@/context/user-context/user-context';

export default function LeaguePage() {
  return (
    <>
      <Meta title="League" />
      <UserProvider>
        {/* <WinnersProvider> */}
        {/* <LeagueConfigProvider> */}
        <League />
        {/* </LeagueConfigProvider> */}
        {/* </WinnersProvider> */}
      </UserProvider>
    </>
  );
}
