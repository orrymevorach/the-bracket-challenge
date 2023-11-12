import Loader from 'components/shared/loader/loader';
import { useState } from 'react';
import styles from './league-takeover-layout.module.scss';
import Takeover from '@/components/shared/takeover/takeover';
import Input from '@/components/shared/input/input';
import Button from '@/components/shared/button/button';
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
            />
            <Button classNames={styles.button}>{buttonLabel}</Button>
          </form>
        </>
      )}
    </Takeover>
  );
}
