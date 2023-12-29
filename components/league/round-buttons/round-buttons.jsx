import { useState } from 'react';
import styles from './round-buttons.module.scss';
import RoundButton from './round-button/round-button';
import clsx from 'clsx';
import { useWindowSize } from '@/context/window-size-context/window-size-context';
import Dropdown from '@/components/shared/dropdown/dropdown';
import { useConfig } from '@/context/config-context/config-context';
import { ROUNDS } from '@/utils/constants';

export default function RoundButtons({
  setCurrentRound,
  currentRound,
  setIsLoading,
  classNames = '',
}) {
  const [currentHoverRound, setCurrentHoverRound] = useState(null);
  const props = {
    setCurrentHoverRound,
    setCurrentRound,
    currentRound,
    currentHoverRound,
    setIsLoading,
  };
  const { isMobile } = useWindowSize();
  const roundNames = ROUNDS.map(({ name, displayName }) => ({
    label: displayName,
    value: name,
  }));

  const { config, setConfig } = useConfig();

  const handleClick = roundName => {
    const round = ROUNDS.find(({ name }) => name === roundName);
    setIsLoading(true);
    setTimeout(() => {
      setCurrentRound(round);
      setConfig({
        ...config,
        currentRound: round.name,
      });
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className={clsx(styles.roundHeadingContainer, classNames)}>
      {isMobile ? (
        <div>
          <Dropdown
            options={roundNames}
            heading="Select A Round"
            selectLabel="Round Name"
            handleChange={handleClick}
            currentSelection={currentRound}
          />
        </div>
      ) : (
        ROUNDS.map((round, index) => (
          <RoundButton
            {...props}
            key={round.name}
            round={round}
            index={index}
            handleClick={() => handleClick(round.name)}
          />
        ))
      )}
    </div>
  );
}
