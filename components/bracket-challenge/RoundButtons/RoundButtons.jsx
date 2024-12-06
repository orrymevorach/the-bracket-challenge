import { useState } from 'react';
import styles from './RoundButtons.module.scss';
import RoundButton from './RoundButton/RoundButton';
import clsx from 'clsx';
import { useWindowSize } from '@/context/window-size-context/window-size-context';
import Dropdown from '@/components/shared/Dropdown/Dropdown';
import { useMatchups } from '@/context/matchup-context/matchup-context';

export default function RoundButtons({ classNames = '' }) {
  const { currentRoundIndex, setCurrentRoundIndex, contests } = useMatchups();
  const [currentHoverRoundIndex, setCurrentHoverRoundIndex] = useState(null);
  const props = {
    currentRoundIndex,
    setCurrentRoundIndex,
    currentHoverRoundIndex,
    setCurrentHoverRoundIndex,
  };
  const { isMobile } = useWindowSize();

  const handleClick = (roundIndex, roundName) => {
    // Desktop implementation
    if (roundIndex !== undefined) {
      setCurrentRoundIndex(roundIndex);
      return;
    }
    // Mobile implementation
    const getRoundIndex = contests.findIndex(
      contest => `${contest.name} ${contest.subBracket}` === roundName
    );
    setCurrentRoundIndex(getRoundIndex);
    return;
  };

  const roundNames = contests.map(contest => ({
    label: `${contest.name} ${contest.subBracket}`,
    value: `${contest.name} ${contest.subBracket}`,
  }));

  return (
    <div className={clsx(styles.roundHeadingContainer, classNames)}>
      {isMobile ? (
        <div>
          <Dropdown
            options={roundNames}
            heading="Select A Round"
            handleChange={handleClick}
            currentSelection={roundNames[currentRoundIndex]?.value}
          />
        </div>
      ) : (
        contests.map((contest, index) => (
          <RoundButton
            {...props}
            key={`${contest.name}-${contest.subBracket}-${index}`}
            round={contest}
            index={index}
            handleClick={() => handleClick(index)}
          />
        ))
      )}
    </div>
  );
}
