import { useMatchups } from '@/context/matchup-context/matchup-context';
import Player from '../player/player';
import styles from './Session.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import BracketArrowButtons from '../BracketArrowButtons/BracketArrowButtons';
import { useState } from 'react';

const addPlaceholders = ({ numberOfSelections, contestants, selections }) => {
  const placeholdersNeeded = contestants.length / 2 - numberOfSelections;
  const placeholders = Array.from({ length: placeholdersNeeded }, (_, i) => ({
    id: `placeholder-${String(i + 1)}`, // Convert index to string
  }));
  return [...selections, ...placeholders];
};

const SelectedPlayer = ({ selection, index, handleRemove }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    await handleRemove({ name: selection?.name });
    setIsLoading(false);
  };
  return (
    <div
      key={`selections-${selection.id}-${index}`}
      className={styles.selectionContainer}
    >
      <Player
        name={selection?.name}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      {selection.name && (
        <button className={styles.removeButton} onClick={handleClick}>
          <FontAwesomeIcon icon={faMinusCircle} color="white" />
        </button>
      )}
    </div>
  );
};

export default function Session() {
  const { currentContest, snowboarders, setWinner } = useMatchups();
  const session = currentContest.session;
  const contestants = session.options;
  const selectedWinners = session.selectedWinner?.length
    ? session.selectedWinner.map(snowboarderName => {
        return snowboarders[snowboarderName];
      })
    : [];
  const numberOfSelections = selectedWinners.reduce((acc, selection) => {
    if (selection.name) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const selections = addPlaceholders({
    numberOfSelections,
    contestants,
    selections: selectedWinners,
  });

  const handleClick = async ({ playerName }) => {
    if (numberOfSelections === contestants.length / 2) return;
    const snowboarderAlreadySelected = selectedWinners.some(
      selection => selection.name === playerName
    );
    if (snowboarderAlreadySelected) return;
    const playerData = snowboarders[playerName];
    const newSelections = [...selections, playerData];
    const sorted = newSelections.sort((a, b) => {
      const hasNameA = 'name' in a;
      const hasNameB = 'name' in b;

      if (hasNameA && !hasNameB) return -1; // Move `a` up
      if (!hasNameA && hasNameB) return 1; // Move `b` up
      return 0; // Keep current order if both or neither have "name"
    });
    const removeLast = sorted.slice(0, -1);
    await setWinner({
      player: removeLast
        .filter(answer => !!answer.name)
        .map(answer => answer.name),
      matchupId: session.name,
    });
  };

  const handleRemove = async ({ name }) => {
    if (!name) return;
    const updatedSelections = selections.map((selection, index) => {
      if (selection.name === name) {
        return { id: `player-removed-placeholder-${String(index + 1)}` };
      }
      return selection;
    });
    const sorted = updatedSelections.sort((a, b) => {
      const hasNameA = 'name' in a;
      const hasNameB = 'name' in b;

      if (hasNameA && !hasNameB) return -1; // Move `a` up
      if (!hasNameA && hasNameB) return 1; // Move `b` up
      return 0; // Keep current order if both or neither have "name"
    });

    await setWinner({
      player: sorted.filter(answer => !!answer.name).map(answer => answer.name),
      matchupId: session.name,
    });
  };

  const highlightTextInsideAsterisks = text => {
    const updatedText = text
      .replace(/\*\*\*(.*?)\*\*\*/g, `<span class=${styles.yellow}>$1</span>`)
      .replace(' - ', '<br />');
    return <div dangerouslySetInnerHTML={{ __html: updatedText }} />;
  };

  return (
    <div className={styles.outerContainer}>
      {currentContest.instructions && (
        <p className={styles.instructions}>
          {highlightTextInsideAsterisks(currentContest.instructions)}
        </p>
      )}

      <div className={styles.container}>
        <BracketArrowButtons>
          <div>
            {contestants.map(contestant => {
              const id = contestant.name || contestant.id;
              if (!id) return;
              return (
                <div key={`contestants-${id}`}>
                  <Player
                    name={contestant.name}
                    handleClick={() =>
                      handleClick({ playerName: contestant?.name })
                    }
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.selectionsContainer}>
            {selections.map((selection, index) => {
              return (
                <SelectedPlayer
                  selection={selection}
                  index={index}
                  handleRemove={handleRemove}
                  key={`selections-${selection.id}-${index}`}
                />
              );
            })}
          </div>
        </BracketArrowButtons>
      </div>
    </div>
  );
}
