import { useContext } from 'react';
import { updateUserTeam } from 'airtable-utils';
import BracketColumn from 'components/bracket-column';
import { MatchupContext } from 'context/matchup-context';

const currentUser = 'Orry'; // This will come from auth

export default function Home() {
  const {
    roundOneMatchups = [],
    roundTwoMatchups = [],
    roundThreeMatchups,
  } = useContext(MatchupContext);

  const handleSubmit = () => {
    const round1Winners = Array.from(
      document.querySelectorAll('[data-roundonewinner]')
    ).map(node => node.dataset.roundonewinner);
    updateUserTeam({ round1Winners, id: 'recwCoP3EjsoG40yr' });
  };

  const handleSubmitRoundTwo = () => {
    const round2Winners = Array.from(
      document.querySelectorAll('[data-roundtwowinner]')
    ).map(node => node.dataset.roundtwowinner);

    updateUserTeam({ round2Winners, id: 'recwCoP3EjsoG40yr' });
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
          <BracketColumn matchups={roundOneMatchups} round={1} />
          <BracketColumn matchups={roundTwoMatchups} round={2} />
          {/* <BracketColumn matchups={roundThreeMatchups} round={3} /> */}
        </div>
        <button onClick={handleSubmit}>Submit Round 1</button>
        <button onClick={handleSubmitRoundTwo}>Submit Round 2</button>
      </div>
    </div>
  );
}
