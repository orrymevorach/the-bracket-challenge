import { useState } from 'react';
import NewUserDashboard from './NewUserDashboard/NewUserDashboard';
import MainDashboard from './MainDashboard/MainDashboard';
import CreateLeagueTakeover from './CreateLeagueTakeover/CreateLeagueTakeover';
import JoinLeagueTakeover from './JoinLeagueTakeover/JoinLeagueTakeover';
import DashboardBar from './DashboardBar/DashboardBar';
import Layout from '@/components/shared/layout/layout';
import Loader from '@/components/shared/Loader/Loader';
import SettingsButton from './SettingsButton/SettingsButton';
import { ROUTES } from '@/utils/constants';
import styles from './Dashboard.module.scss';
import OpeningSoon from '../dashboard/OpeningSoon/OpeningSoon';
import { useUser } from '@/context/user-context/user-context';
import Wrapper from '../shared/Wrapper/Wrapper';

export default function Dashboard({ leagues }) {
  const user = useUser();
  const leagueData = user?.leagues;
  const [showCreateLeagueTakeover, setShowCreateLeagueTakeover] =
    useState(false);
  const [showJoinLeagueTakeover, setShowJoinLeagueTakeover] = useState(false);
  const hasLeagues = leagueData && leagueData.length > 0;
  if (!user) return <Loader isFullPage />;
  return (
    <Layout removeWrapper>
      <DashboardBar>
        {/* <SettingsButton
          href={{
            pathname: `${ROUTES.ACCOUNT_SETTINGS}`,
          }}
          classNames={styles.settingsButton}
          text="Account"
        /> */}
      </DashboardBar>
      {showCreateLeagueTakeover && (
        <CreateLeagueTakeover setShowTakeover={setShowCreateLeagueTakeover} />
      )}
      {showJoinLeagueTakeover && (
        <JoinLeagueTakeover setShowTakeover={setShowJoinLeagueTakeover} />
      )}
      <Wrapper>
        {/* {hasLeagues ? (
          <MainDashboard
            leagueData={leagues}
            setShowCreateLeagueTakeover={setShowCreateLeagueTakeover}
            setShowJoinLeagueTakeover={setShowJoinLeagueTakeover}
          />
        ) : (
          <NewUserDashboard
            showCreateLeagueTakeover={showCreateLeagueTakeover}
            setShowCreateLeagueTakeover={setShowCreateLeagueTakeover}
            showJoinLeagueTakeover={showJoinLeagueTakeover}
            setShowJoinLeagueTakeover={setShowJoinLeagueTakeover}
          />
        )} */}
        <OpeningSoon />
      </Wrapper>
    </Layout>
  );
}
