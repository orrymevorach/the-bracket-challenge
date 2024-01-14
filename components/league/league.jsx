import styles from './league.module.scss';
import useGetLeagueRankings from '@/components/league/useGetLeagueRankings';
import LeagueRankingsTable from '@/components/league/league-rankings-table/league-rankings-table';
import LeaguePageLayout from './league-page-layout/league-page-layout';
import CreateBracketPrompt from './create-bracket-prompt/create-bracket-prompt';

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

export default function League() {
  const { bracketsSortedByRankings } = useGetLeagueRankings();
  const hasBracketData =
    !!bracketsSortedByRankings && bracketsSortedByRankings.length > 0;

  return (
    <LeaguePageLayout title="League Rankings:">
      {hasBracketData ? (
        <div className={styles.mainContentContainer}>
          <LeagueRankingsTable leagueData={bracketsSortedByRankings} />
        </div>
      ) : (
        <div className={styles.mainContentContainer}>
          <CreateBracketPrompt brackets={bracketsSortedByRankings} />
        </div>
      )}
    </LeaguePageLayout>
  );
}
