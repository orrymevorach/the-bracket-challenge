import { useState } from 'react';
import Player from 'components/player';

export const getPlayerRowHeight = round => {
  let start = 1;
  for (let index = 0; index < round; index++) {
    start = start * 2;
  }
  return start * 50;
};

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
            const aMatchup = a.matchupId;
            const bMatchup = b.matchupId;
            if (aMatchup > bMatchup) return 1;
            return -1;
          })
          .map((snowboarder, index) => {
            // Adding extra vertical spacing in case some players have not yet been selected
            if (!snowboarder)
              return (
                <div
                  key={index}
                  style={{ height: `${getPlayerRowHeight(round)}px` }}
                ></div>
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
          data-roundthreewinner={selectedWinner.id}
          data-roundfourwinner={selectedWinner.id}
        >
          {selectedWinner.name}
        </p>
      )}
    </div>
  );
}
