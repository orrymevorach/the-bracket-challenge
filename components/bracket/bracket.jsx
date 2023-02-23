import { useState } from 'react';
import Player from 'components/player';

export default function Bracket({ snowboarders = [], round }) {
  const [selectedWinner, setSelectedWinner] = useState({ name: '', id: '' });
  if (snowboarders.length !== 2) snowboarders.push(undefined); // Creating empty array item for extra vertical spacing in case some players have not yet been selected
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid white',
        borderBottom: '1px solid white',
      }}
    >
      <div>
        {snowboarders
          .slice()
          .sort((a, b) => {
            const aMatchup = a.matchups;
            const bMatchup = b.matchups;
            if (aMatchup > bMatchup) return 1;
            return -1;
          })
          .map((snowboarder, index) => {
            // Adding extra vertical spacing in case some players have not yet been selected
            if (!snowboarder)
              return (
                <div key={index} style={{ height: `${round * 50}px` }}></div>
              );
            const { name, id } = snowboarder;
            return (
              <Player
                key={name}
                name={name}
                id={id}
                setWinner={setSelectedWinner}
                round={round}
              />
            );
          })}
      </div>

      {selectedWinner.name && (
        // <p style={{ marginLeft: '20px' }} data-winner={selectedWinner.id}>
        <p
          style={{ marginLeft: '20px' }}
          data-roundonewinner={selectedWinner.id}
          data-roundtwowinner={selectedWinner.id}
        >
          {selectedWinner.name}
        </p>
      )}
    </div>
  );
}
