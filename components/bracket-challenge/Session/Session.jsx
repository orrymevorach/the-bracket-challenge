import { useMatchups } from '@/context/matchup-context/matchup-context';
import Player from '../player/player';
import styles from './Session.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const createPlaceholders = numberOfContestants => {
  return Array.from({ length: numberOfContestants / 2 }, (_, i) => ({
    id: String(i),
  }));
};

export default function Session() {
  const { currentContest, snowboarders } = useMatchups();
  const session = currentContest.session;
  const contestants = session.options;
  const [selections, setSelections] = useState(
    createPlaceholders(contestants.length)
  );
  const [numberOfSelections, setNumberOfSelections] = useState(0);

  const handleClick = ({ player }) => {
    if (numberOfSelections === contestants.length / 2) return;
    if (selections.some(selection => selection.name === player)) return;
    const playerData = snowboarders[player];
    const newSelections = [...selections, playerData];
    const sorted = newSelections.sort((a, b) => {
      const hasNameA = 'name' in a;
      const hasNameB = 'name' in b;

      if (hasNameA && !hasNameB) return -1; // Move `a` up
      if (!hasNameA && hasNameB) return 1; // Move `b` up
      return 0; // Keep current order if both or neither have "name"
    });
    const removeLast = sorted.slice(0, -1);
    setSelections(removeLast);
    setNumberOfSelections(numberOfSelections + 1);
  };

  const handleRemove = ({ name }) => {
    const newSelections = selections
      .map((selection, index) => {
        if (selection.name === name) {
          return { id: index };
        }
        const player = snowboarders[selection.name];
        return player;
      })
      .sort((a, b) => {
        const hasNameA = 'name' in a;
        const hasNameB = 'name' in b;

        if (hasNameA && !hasNameB) return -1; // Move `a` up
        if (!hasNameA && hasNameB) return 1; // Move `b` up
        return 0; // Keep current order if both or neither have "name"
      });
    setSelections(newSelections);
    setNumberOfSelections(numberOfSelections - 1);
  };

  return (
    <div className={styles.container}>
      <div>
        {contestants.map(contestant => {
          return (
            <div key={`contestants-${contestant.id}`}>
              <Player name={contestant.name} handleClick={handleClick} />
            </div>
          );
        })}
      </div>
      <div className={styles.selectionsContainer}>
        {selections.map((selection, index) => {
          return (
            <div
              key={`selections-${selection.id}-${index}`}
              className={styles.selectionContainer}
            >
              <Player name={selection.name} />
              <button
                className={styles.removeButton}
                onClick={() => handleRemove({ name: selection.name })}
              >
                <FontAwesomeIcon icon={faMinusCircle} color="white" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
