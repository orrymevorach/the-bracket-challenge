import { useUser } from 'context/user-context/user-context';
import styles from './dashboard.module.scss';
import Loader from 'components/shared/loader/loader';
import UserBracketsTable from './user-brackets-table/user-brackets-table';
import useDashboardRankings from './useDashboardRankings';
import { useWinners } from '@/context/winners-context/winners-context';
import { ROUNDS } from '../league/round-buttons/round-buttons';
import Layout from '../shared/layout/layout';
import Button from '../shared/button/button';
import { useState } from 'react';
import CreateLeagueTakeover from './create-league-takeover/create-league-takeover';
import JoinLeagueTakeover from './join-league-takeover/join-league-takeover';

export default function Dashboard() {
  const [showCreateLeagueTakeover, setShowCreateLeagueTakeover] =
    useState(false);
  const [showJoinLeagueTakeover, setShowJoinLeagueTakeover] = useState(false);
  const user = useUser();
  const winnersData = useWinners();
  const { leagueData } = useDashboardRankings({
    userLeagues: user.leagues,
    winnersData,
    userName: user.name,
  });
  if (user.isLoading) return <Loader isFullPage />;
  const hasLeagueData = !!leagueData;

  return (
    <Layout>
      {showCreateLeagueTakeover && (
        <CreateLeagueTakeover setShowTakeover={setShowCreateLeagueTakeover} />
      )}
      {showJoinLeagueTakeover && (
        <JoinLeagueTakeover setShowTakeover={setShowJoinLeagueTakeover} />
      )}
      <div className={styles.buttonsContainer}>
        <Button
          handleClick={() => setShowJoinLeagueTakeover(true)}
          classNames={styles.button}
        >
          Join League
        </Button>
        <Button
          handleClick={() => setShowCreateLeagueTakeover(true)}
          classNames={styles.button}
        >
          Create League
        </Button>
      </div>
      <p className={styles.heading}>Your Leagues</p>
      {hasLeagueData ? (
        <UserBracketsTable
          {...user}
          leagues={leagueData}
          currentRound={ROUNDS[0].name}
        />
      ) : (
        <Loader isFullPage={false} classNames={styles.loader} />
      )}
    </Layout>
  );
}
