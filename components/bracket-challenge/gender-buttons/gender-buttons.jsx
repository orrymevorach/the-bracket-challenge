import Button from '@/components/shared/button/button';
import styles from './gender-buttons.module.scss';

export const GENDERS = {
  MALE: 'male',
  FEMALE: 'female',
};

export default function GenderButtons({ setGender, setIsLoading, gender }) {
  const handleSetGender = ({ gender }) => {
    setIsLoading(true);
    setTimeout(() => {
      setGender(gender);
    }, 200);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };
  return (
    <div className={styles.genderButtons}>
      <Button
        handleClick={() => handleSetGender({ gender: GENDERS.MALE })}
        isLight={gender === GENDERS.MALE}
      >
        Men
      </Button>
      <Button
        handleClick={() => handleSetGender({ gender: GENDERS.FEMALE })}
        isLight={gender === GENDERS.FEMALE}
      >
        Women
      </Button>
    </div>
  );
}
