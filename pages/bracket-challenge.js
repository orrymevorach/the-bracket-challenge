import BracketChallengeContainer from '@/components/bracket-challenge/bracket-challenge-container';
import Meta from '@/components/shared/Head/Head';
import { LeagueConfigProvider } from '@/context/league-config-context/league-config-context';
import { UserProvider } from '@/context/user-context/user-context';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';
import { getBracket, getLeague } from '@/lib/airtable';

export default function BracketChallengePage({ bracket }) {
  return (
    <>
      <Meta title="Bracket Challenge" />
      <UserProvider>
        <LeagueConfigProvider>
          <MatchupDataProvider>
            <BracketChallengeContainer />
          </MatchupDataProvider>
        </LeagueConfigProvider>
      </UserProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  const bracketId = context.query.bracketId;
  const leagueId = context.query.leagueId;
  const bracketData = await getBracket({ recId: bracketId });
  const leagueData = await getLeague({ id: leagueId });
  const json = leagueData.json;
  const bracketsWithSelections = JSON.parse(json);
  const currentBracketSelections = bracketsWithSelections.find(
    bracket => bracket.id === bracketId
  ).selections;
  bracketData.selections = currentBracketSelections;

  return {
    props: {
      bracket: bracketData,
    },
  };
}
