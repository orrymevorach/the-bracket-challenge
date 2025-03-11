import { useMatchups } from '@/context/matchup-context/matchup-context';
import Player from '../player/player';
import styles from './Session.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import BracketArrowButtons from '../BracketArrowButtons/BracketArrowButtons';

const addPlaceholders = ({ numberOfSelections, contestants, selections }) => {
  const placeholdersNeeded = contestants.length / 2 - numberOfSelections;
  const placeholders = Array.from({ length: placeholdersNeeded }, (_, i) => ({
    id: `placeholder-${String(i + 1)}`, // Convert index to string
  }));
  return [...selections, ...placeholders];
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
    setWinner({
      player: removeLast
        .filter(answer => !!answer.name)
        .map(answer => answer.name),
      matchupId: session.name,
    });
  };

  const handleRemove = ({ name }) => {
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

    setWinner({
      player: sorted.filter(answer => !!answer.name).map(answer => answer.name),
      matchupId: session.name,
    });
  };

  return (
    <div className={styles.container}>
      <BracketArrowButtons>
        <div>
          {contestants.map(contestant => {
            return (
              <div key={`contestants-${contestant.id}`}>
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
            if (!selection) return;
            return (
              <div
                key={`selections-${selection.id}-${index}`}
                className={styles.selectionContainer}
              >
                <Player name={selection?.name} />
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemove({ name: selection?.name })}
                >
                  <FontAwesomeIcon icon={faMinusCircle} color="white" />
                </button>
              </div>
            );
          })}
        </div>
      </BracketArrowButtons>
    </div>
  );
}
