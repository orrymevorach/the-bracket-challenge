import styles from './League.module.scss';
import LeagueRankingsTable from '@/components/LeaguePage/LeagueRankingsTable/LeagueRankingsTable';
import Layout from '../shared/Layout/Layout';
import DashboardBar from '../DashboardPage/DashboardBar/DashboardBar';
import Wrapper from '../shared/Wrapper/Wrapper';

export const ROUNDS = [
  {
    displayName: 'Overall',
    name: 'Overall',
  },
  {
    displayName: 'NST Duels',
    name: 'Duels',
  },
  {
    displayName: 'Revelstoke Mountain Resort',
    name: 'Revelstoke',
  },
  {
    displayName: 'Selkirk Tangiers',
    name: 'Selkirk',
  },
];

export default function League({ league, contests }) {
  return (
    <Layout removeWrapper>
      <DashboardBar></DashboardBar>
      <Wrapper>
        <div className={styles.mainContentContainer}>
          <LeagueRankingsTable leagueData={league} contests={contests} />
        </div>
      </Wrapper>
    </Layout>
  );
}
