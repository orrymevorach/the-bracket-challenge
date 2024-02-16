import styles from './league.module.scss';
import useGetLeagueRankings from '@/components/league/useGetLeagueRankings';
import LeagueRankingsTable from '@/components/league/league-rankings-table/league-rankings-table';
import LeaguePageLayout from './league-page-layout/league-page-layout';
import CreateBracketPrompt from './create-bracket-prompt/create-bracket-prompt';
import useUser from '@/context/user-context/useUser';
import Loader from '../shared/loader/loader';

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
  const user = useUser();
  if (!bracketsSortedByRankings)
    return (
      <LeaguePageLayout title="League Rankings:" hideBackButton>
        <Loader />
      </LeaguePageLayout>
    );

  const hasCurrentUserBracketData = bracketsSortedByRankings.find(
    ({ memberId }) => memberId.id === user.id
  );

  const hasLeagueBrackets = bracketsSortedByRankings.length > 0;

  return (
    <LeaguePageLayout title="League Rankings:" hideBackButton>
      {!hasCurrentUserBracketData && (
        <div className={styles.mainContentContainer}>
          <CreateBracketPrompt brackets={bracketsSortedByRankings} />
        </div>
      )}
      {hasLeagueBrackets && (
        <div className={styles.mainContentContainer}>
          <LeagueRankingsTable leagueData={bracketsSortedByRankings} />
        </div>
      )}
    </LeaguePageLayout>
  );
}
