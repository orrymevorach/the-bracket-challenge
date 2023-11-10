import styles from './league.module.scss';
import Loader from 'components/shared/loader/loader';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '@/components/shared/layout/layout';
import RoundButtons, {
  ROUNDS,
} from '@/components/league/round-buttons/round-buttons';
import useLeagueRankings from '@/components/league/useLeagueRankings';
import LeagueRankingsTable from '@/components/league/league-rankings-table/league-rankings-table';

export default function League() {
  const [currentRound, setCurrentRound] = useState(ROUNDS[0]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    query: { slug },
  } = useRouter();
  const { leagueData } = useLeagueRankings({ slug });
  const hasLeagueData = !!leagueData;

  return (
    <Layout>
      <p className={styles.heading}>{slug} Rankings</p>
      <RoundButtons
        currentRound={currentRound}
        setCurrentRound={setCurrentRound}
        setIsLoading={setIsLoading}
      />
      {!isLoading && hasLeagueData ? (
        <LeagueRankingsTable
          leagueData={leagueData}
          currentRound={currentRound.name}
        />
      ) : (
        <Loader classNames={styles.loader} />
      )}
    </Layout>
  );
}
