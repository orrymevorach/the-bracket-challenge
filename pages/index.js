import { updateUserTeam } from 'airtable-utils';
import BracketColumn from 'components/bracket-column';
import { useMatchups } from 'context/matchup-context/matchup-context';
import { useUser } from 'context/user-context/user-context';

const currentUser = 'Orry'; // This will come from auth

const mapRoundNumberToRoundData = {
  1: {
    dataAttribute: 'roundonewinner',
    airtableColumnName: 'quarterFinalMatchups',
  },

  2: {
    dataAttribute: 'roundtwowinner',
    airtableColumnName: 'semiFinalMatchups',
  },
  3: {
    dataAttribute: 'roundthreewinner',
    airtableColumnName: 'finalsMatchup',
  },
  4: {
    dataAttribute: 'roundfourwinner',
    airtableColumnName: 'winner',
  },
};

export default function Home() {
  const {
    roundOneMatchups = [],
    roundTwoMatchups = [],
    roundThreeMatchups = [],
    roundFourMatchups = [],
    isRoundOneLoading,
  } = useMatchups();
  const { isLoading: isUserDataLoading } = useUser();

  const handleSubmit = ({ round }) => {
    const { dataAttribute, airtableColumnName } =
      mapRoundNumberToRoundData[round];
    const roundWinners = Array.from(
      document.querySelectorAll(`[data-${dataAttribute}]`)
    ).map(node => node.dataset[dataAttribute]);
    updateUserTeam({
      [airtableColumnName]: roundWinners,
      id: 'recwCoP3EjsoG40yr',
    });
  };

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
            matchups={roundTwoMatchups}
            round={2}
            isLoading={isUserDataLoading}
          />
          <BracketColumn
            matchups={roundThreeMatchups}
            round={3}
            isLoading={isUserDataLoading}
          />
          <BracketColumn
            matchups={roundFourMatchups}
            round={4}
            isLoading={isUserDataLoading}
          />
        </div>
        <button onClick={() => handleSubmit({ round: 1 })}>
          Submit Round 1
        </button>
        <button onClick={() => handleSubmit({ round: 2 })}>
          Submit Round 2
        </button>
        <button onClick={() => handleSubmit({ round: 3 })}>
          Submit Round 3
        </button>
        <button onClick={() => handleSubmit({ round: 4 })}>
          Submit Round 4
        </button>
      </div>
    </div>
  );
}
