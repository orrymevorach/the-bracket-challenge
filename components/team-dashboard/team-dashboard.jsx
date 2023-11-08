import { useUser } from 'context/user-context/user-context';
import styles from './team-dashboard.module.scss';
import Loader from 'components/shared/loader/loader';
import BracketsTable from './brackets-table/brackets-table';
import useDashboardRankings from './useDashboardRankings';
import { useWinners } from '@/context/winners-context/winners-context';
import RoundButtons from './round-buttons/round-buttons';
import { useState } from 'react';

export const ROUNDS = [
  {
    name: 'Duels',
  },
  {
    name: 'Revelstoke',
  },
  {
    name: 'Selkirk Tangiers',
  },
];
const defaultRound = { name: 'Overall' };
export default function TeamDashboard() {
  const [currentRound, setCurrentRound] = useState(defaultRound);
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
      <p className={styles.name}>Welcome, {firstName}!</p>
      <RoundButtons
        defaultRound={defaultRound}
        currentRound={currentRound}
        setCurrentRound={setCurrentRound}
      />
      {hasBracketData ? (
        <BracketsTable
          {...user}
          brackets={bracketData}
          currentRound={currentRound.name}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}
