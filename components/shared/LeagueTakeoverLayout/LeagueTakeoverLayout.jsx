import Loader from '@/components/shared/Loader/Loader';
import { useState } from 'react';
import styles from './LeagueTakeoverLayout.module.scss';
import Takeover from '@/components/shared/Takeover/Takeover';
import Input from '@/components/shared/Input/Input';
import Button from '@/components/shared/Button/Button';
import clsx from 'clsx';

export default function LeagueTakeoverLayout({
  setShowTakeover,
  handleSubmit = () => {},
  title = '',
  label = '',
  buttonLabel = '',
  inputValue,
  setInputValue,
  classNames = '',
  children,
  error = '',
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = async e => {
    e.preventDefault();
    setIsLoading(true);
    await handleSubmit();
  };

  return (
    <Takeover
      handleClose={() => setShowTakeover(false)}
      modalClassNames={clsx(styles.container, classNames)}
    >
      {isLoading ? (
        <Loader color="black" />
      ) : (
        <>
          <p className={styles.title}>{title}</p>
          <form
            action="#"
            onSubmit={e => handleSubmitForm(e)}
            className={styles.form}
          >
            <Input
              type="text"
              id="input"
              value={inputValue}
              handleChange={e => setInputValue(e.target.value)}
              classNames={styles.input}
              label={label}
              labelClassNames={styles.label}
              error={error}
            />
            <Button isSecondary classNames={styles.button}>
              {buttonLabel}
            </Button>
          </form>
          {children}
        </>
      )}
    </Takeover>
  );
}
