import { useUser } from 'context/user-context/user-context';
import styles from './team-dashboard.module.scss';
import Loader from 'components/shared/loader/loader';
import BracketsTable from './brackets-table/brackets-table';
import useDashboardRankings from './useDashboardRankings';
import { useWinners } from '@/context/winners-context/winners-context';
import RoundButtons, { ROUNDS } from './round-buttons/round-buttons';
import { useState } from 'react';
import Button from '../shared/button/button';

export default function TeamDashboard() {
  const [currentRound, setCurrentRound] = useState(ROUNDS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const winnersData = useWinners();
  const { bracketData } = useDashboardRankings({
    userBrackets: user.brackets,
    winnersData,
  });
  if (user.isLoading) return <Loader />;

  const firstName = user.name?.split(' ')[0];
  const hasBracketData = !!bracketData;

  return (
    <div className={styles.teamDashboard}>
      <div className={styles.topContainer}>
        <p className={styles.name}>Hello, {firstName}!</p>
        <Button>Log Out</Button>
      </div>
      <p className={styles.resultsText}>Results</p>
      <RoundButtons
        currentRound={currentRound}
        setCurrentRound={setCurrentRound}
        setIsLoading={setIsLoading}
      />
      {!isLoading && hasBracketData ? (
        <BracketsTable
          {...user}
          brackets={bracketData}
          currentRound={currentRound.name}
        />
      ) : (
        <Loader isFullPage={false} classNames={styles.loader} />
      )}
    </div>
  );
}
