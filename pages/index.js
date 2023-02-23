import { updateUserTeam } from 'airtable-utils';
import BracketColumn from 'components/bracket-column';
import { useMatchups } from 'context/matchup-context/matchup-context';
import { useUser } from 'context/user-context/user-context';

const currentUser = 'Orry'; // This will come from auth

export default function Home() {
  const {
    allMatchups: {
      roundOneMatchups = [],
      quarterFinalMatchups = [],
      semiFinalMatchups = [],
      finalsMatchup = [],
      winner,
      isRoundOneLoading,
    },
  } = useMatchups();
  const { isLoading: isUserDataLoading } = useUser();

  return (
    <div
      style={{
        display: 'flex',
        padding: '50px 20px',
      }}
    >
      <div>
        <h2 style={{ marginBottom: '50px' }}>Welcome: {currentUser}!</h2>
        <h2>Matchups:</h2>
        <div style={{ display: 'flex' }}>
          <BracketColumn
            matchups={roundOneMatchups}
            round={1}
            isLoading={isRoundOneLoading}
          />
          <BracketColumn
            matchups={quarterFinalMatchups}
            round={2}
            isLoading={isUserDataLoading}
          />
          {/* <BracketColumn
            matchups={semiFinalMatchups}
            round={3}
            isLoading={isUserDataLoading}
          />
          <BracketColumn
            matchups={finalsMatchup}
            round={4}
            isLoading={isUserDataLoading}
          />
          <BracketColumn
            matchups={winner}
            round={5}
            isLoading={isUserDataLoading}
          />  */}
        </div>
      </div>
    </div>
  );
}
