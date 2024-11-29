import styles from './league.module.scss';
import useGetLeagueRankings from '@/components/league/useGetLeagueRankings';
import LeagueRankingsTable from '@/components/league/league-rankings-table/league-rankings-table';
import LeaguePageLayout from './league-page-layout/league-page-layout';
import CreateBracketPrompt from './create-bracket-prompt/create-bracket-prompt';
import { useUser } from '@/context/user-context/user-context';
import Loader from '../shared/Loader/Loader';

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

  const hasLeagueBrackets = bracketsSortedByRankings.length > 0;
  const hasCurrentUserBracketData =
    hasLeagueBrackets &&
    bracketsSortedByRankings.find(({ memberID }) => {
      return memberID[0] === user.id;
    });

  return (
    <LeaguePageLayout title="League Rankings:" hideBackButton>
      {!hasCurrentUserBracketData && (
        <div className={styles.mainContentContainer}>
          <CreateBracketPrompt />
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
