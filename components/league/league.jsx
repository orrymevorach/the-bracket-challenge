import styles from './league.module.scss';
import Loader from 'components/shared/loader/loader';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '@/components/shared/layout/layout';
import RoundButtons, {
  ROUNDS,
} from '@/components/league/round-buttons/round-buttons';
import useGetLeagueRankings from '@/components/league/useGetLeagueRankings';
import LeagueRankingsTable from '@/components/league/league-rankings-table/league-rankings-table';
import Button from '../shared/button/button';
import useUser from '@/hooks/useUser';
import useGetLeagueName from './useGetLeagueName';

export default function League() {
  const [currentRound, setCurrentRound] = useState(ROUNDS[0]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    query: { slug },
  } = useRouter();
  const user = useUser();
  const leagueName = useGetLeagueName({ slug });
  const { bracketsSortedByRankings } = useGetLeagueRankings({ slug });
  const hasBracketData =
    !!bracketsSortedByRankings && bracketsSortedByRankings.length > 0;
  const currentUserHasBracket = hasBracketData
    ? bracketsSortedByRankings.find(
        ({ userName }) => user.name === userName[0].name
      )
    : null;
  return (
    <Layout>
      <p className={styles.heading}>League Rankings:</p>
      <p className={styles.leagueName}>{leagueName}</p>
      <RoundButtons
        currentRound={currentRound}
        setCurrentRound={setCurrentRound}
        setIsLoading={setIsLoading}
      />
      {isLoading && <Loader classNames={styles.loader} />}
      {!currentUserHasBracket && (
        <Button classNames={styles.createBracketButton}>Create Bracket</Button>
      )}
      {!isLoading && hasBracketData && (
        <LeagueRankingsTable
          leagueData={bracketsSortedByRankings}
          currentRound={currentRound.name}
        />
      )}
    </Layout>
  );
}
