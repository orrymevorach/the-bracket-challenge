import { updateUserTeam } from 'airtable-utils';
import BracketColumn from 'components/bracket-column';
import { useMatchups } from 'context/matchup-context/matchup-context';

const currentUser = 'Orry'; // This will come from auth

const mapRoundNumberToRoundData = {
  1: {
    dataAttribute: 'roundonewinner',
    airtableColumnName: 'round1Winners',
  },

  2: {
    dataAttribute: 'roundtwowinner',
    airtableColumnName: 'round2Winners',
  },
};

export default function Home() {
  const {
    roundOneMatchups = [],
    roundTwoMatchups = [],
    roundThreeMatchups = [],
    isRoundOneLoading,
    isRoundTwoLoading,
    isRoundThreeLoading,
  } = useMatchups();

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
            isLoading={isRoundTwoLoading}
          />
          <BracketColumn
            matchups={roundThreeMatchups}
            round={3}
            isLoading={isRoundThreeLoading}
          />
        </div>
        <button onClick={() => handleSubmit({ round: 1 })}>
          Submit Round 1
        </button>
        <button onClick={() => handleSubmit({ round: 2 })}>
          Submit Round 2
        </button>
      </div>
    </div>
  );
}
