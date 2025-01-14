import { useState } from 'react';
import NewUserDashboard from './NewUserDashboard/NewUserDashboard';
import MainDashboard from './MainDashboard/MainDashboard';
import CreateLeagueTakeover from './CreateLeagueTakeover/CreateLeagueTakeover';
import JoinLeagueTakeover from './JoinLeagueTakeover/JoinLeagueTakeover';
import DashboardBar from './DashboardBar/DashboardBar';
import Layout from '@/components/shared/Layout/Layout';
import Loader from '@/components/shared/Loader/Loader';
import OpeningSoon from './OpeningSoon/OpeningSoon';
import { useUser } from '@/context/user-context/user-context';
import Wrapper from '../shared/Wrapper/Wrapper';

export default function Dashboard({
  leagues,
  sports,
  enableDashboardFeatureFlag,
}) {
  const user = useUser();
  const [showCreateLeagueTakeover, setShowCreateLeagueTakeover] =
    useState(false);
  const [showJoinLeagueTakeover, setShowJoinLeagueTakeover] = useState(false);
  const hasLeagues = leagues && leagues.length > 0;
  if (!user) return <Loader isFullPage />;
  return (
    <Layout removeWrapper>
      <DashboardBar />
      {showCreateLeagueTakeover && (
        <CreateLeagueTakeover
          setShowTakeover={setShowCreateLeagueTakeover}
          sports={sports}
        />
      )}
      {showJoinLeagueTakeover && (
        <JoinLeagueTakeover setShowTakeover={setShowJoinLeagueTakeover} />
      )}
      <Wrapper>
        {!enableDashboardFeatureFlag ? (
          <OpeningSoon />
        ) : hasLeagues ? (
          <MainDashboard
            leagueData={leagues}
            setShowCreateLeagueTakeover={setShowCreateLeagueTakeover}
            setShowJoinLeagueTakeover={setShowJoinLeagueTakeover}
            sports={sports}
          />
        ) : (
          <NewUserDashboard
            showCreateLeagueTakeover={showCreateLeagueTakeover}
            setShowCreateLeagueTakeover={setShowCreateLeagueTakeover}
            showJoinLeagueTakeover={showJoinLeagueTakeover}
            setShowJoinLeagueTakeover={setShowJoinLeagueTakeover}
          />
        )}
      </Wrapper>
    </Layout>
  );
}
