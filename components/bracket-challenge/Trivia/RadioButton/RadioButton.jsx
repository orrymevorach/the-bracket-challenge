import { useMatchups } from '@/context/matchup-context/matchup-context';
import styles from './RadioButton.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import Loader from '@/components/shared/Loader/Loader';
import clsx from 'clsx';

export default function RadioButton({
  name,
  image,
  question,
  isChecked,
  isCorrect,
  isIncorrect,
  isDisabled,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { setWinner } = useMatchups();
  const imgSrc = image[0].url;

  const handleClick = async ({ name, matchupId }) => {
    setIsLoading(true);
    await setWinner({ player: name, matchupId });
    setIsLoading(false);
  };
  const [firstName, lastName, secondLastName] = name.split(' ');

  return (
    <div
      className={clsx(
        styles.radioOption,
        isChecked && styles.checked,
        isLoading && styles.loading,
        isCorrect && styles.correct,
        isIncorrect && isChecked && styles.incorrect,
        isDisabled && styles.disabled
      )}
      key={name}
    >
      {isLoading ? (
        <Loader isDotted />
      ) : (
        <label>
          <Image src={imgSrc} alt={name} width={105} height={105} />
          <input
            type="radio"
            name="options"
            value={name}
            className={styles.radioInput}
            onClick={
              isDisabled
                ? () => {}
                : () => handleClick({ name, matchupId: question.question })
            }
            defaultChecked={isChecked}
          />
          <p className={styles.optionName}>
            {firstName} <br /> {lastName} {secondLastName}
          </p>
        </label>
      )}
    </div>
  );
}
