import styles from './dashboard.module.scss';
import UserBracketsTable from './user-brackets-table/user-brackets-table';
import { ROUNDS } from '../league/league';
import Layout from '../shared/layout/layout';
import Button from '../shared/button/button';
import { useState } from 'react';
import CreateLeagueTakeover from './create-league-takeover/create-league-takeover';
import JoinLeagueTakeover from './join-league-takeover/join-league-takeover';
// import OverallRankingsTable from './overall-rankings-table/overall-rankings-table';
import JoinPublicLeagueTakeover from './join-public-league-takeover/join-public-league-takeover';
import JoinPublicLeaguePrompt from './join-public-league-prompt/join-public-league-prompt';
// import { useUser } from '@/context/user-context/user-context';
import { topDawgCompetitionLeagueId } from '@/utils/constants';
import OpeningSoon from './OpeningSoon/OpeningSoon';

export default function Dashboard() {
  const [showCreateLeagueTakeover, setShowCreateLeagueTakeover] =
    useState(false);
  const [showJoinLeagueTakeover, setShowJoinLeagueTakeover] = useState(false);
  const [showJoinPublicLeagueTakeover, setShowJoinPublicLeagueTakeover] =
    useState(false);

  // const user = useUser();
  // const hasJoinedPublicLeague =
  //   user.leagues && user.leagues.length > 0
  //     ? user.leagues.find(({ id }) => id === topDawgCompetitionLeagueId)
  //     : false;

  return (
    <Layout isLight>
      {showCreateLeagueTakeover && (
        <CreateLeagueTakeover setShowTakeover={setShowCreateLeagueTakeover} />
      )}
      {showJoinLeagueTakeover && (
        <JoinLeagueTakeover setShowTakeover={setShowJoinLeagueTakeover} />
      )}
      {showJoinPublicLeagueTakeover && (
        <JoinPublicLeagueTakeover
          setShowTakeover={setShowJoinPublicLeagueTakeover}
        />
      )}
      <div className={styles.topContainer}>
        <div>
          <p className={styles.dashboardText}>Dashboard</p>
          <p className={styles.yourLeaguesText}>Your Leagues</p>
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            handleClick={() => setShowJoinLeagueTakeover(true)}
            classNames={styles.button}
          >
            Join Private League
          </Button>
          <Button
            handleClick={() => setShowCreateLeagueTakeover(true)}
            classNames={styles.button}
          >
            Create League
          </Button>
        </div>
      </div>
      <OpeningSoon />
      {/* {!hasJoinedPublicLeague && (
        <JoinPublicLeaguePrompt
          setShowTakeover={setShowJoinPublicLeagueTakeover}
        />
      )} */}

      {/* <UserBracketsTable currentRound={ROUNDS[0].name} /> */}
      {/* <OverallRankingsTable /> */}
    </Layout>
  );
}
