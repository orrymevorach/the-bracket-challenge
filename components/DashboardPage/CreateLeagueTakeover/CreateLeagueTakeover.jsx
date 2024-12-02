import { useState } from 'react';
import { createLeague } from '@/lib/airtable';
import { useUser } from 'context/user-context/user-context';
import { ROUTES } from '@/utils/constants';
import Takeover from '@/components/shared/Takeover/Takeover';
import Loader from '@/components/shared/Loader/Loader';
import Input from '@/components/shared/Input/Input';
import leagueTakeoverLayoutStyles from '@/components/shared/LeagueTakeoverLayout/LeagueTakeoverLayout.module.scss';
import clsx from 'clsx';
import Button from '@/components/shared/Button/Button';
import styles from './CreateLeagueTakeover.module.scss';
import Toggle from '@/components/shared/Toggle/Toggle';

export default function CreateLeagueTakeover({ setShowTakeover, sports }) {
  const [leagueName, setLeagueName] = useState('');
  const [selectedToggle, setSelectedToggle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!leagueName || !selectedToggle) {
      setError('Please fill out all fields');
      return;
    }
    setIsLoading(true);
    await createLeague({
      name: leagueName,
      user,
      sport: selectedToggle,
    });
    window.location = `${ROUTES.DASHBOARD}`;
    setIsLoading(false);
  };

  const handleChangeInput = e => {
    setError('');
    setLeagueName(e.target.value);
  };

  const handleChangeToggle = value => {
    setError('');
    setSelectedToggle(value);
  };

  return (
    <Takeover
      handleClose={() => setShowTakeover(false)}
      modalClassNames={clsx(
        leagueTakeoverLayoutStyles.container,
        styles.container
      )}
    >
      {isLoading ? (
        <Loader color="black" />
      ) : (
        <>
          <p className={leagueTakeoverLayoutStyles.title}>Create League</p>
          <form
            action="#"
            onSubmit={e => handleSubmit(e)}
            className={leagueTakeoverLayoutStyles.form}
          >
            <Input
              type="text"
              id="input"
              value={leagueName}
              handleChange={handleChangeInput}
              classNames={leagueTakeoverLayoutStyles.input}
              label="Enter a name for your league"
              labelClassNames={leagueTakeoverLayoutStyles.label}
              error={error}
            />
            <div className={styles.toggleContainer}>
              <Toggle
                sports={sports}
                selectedToggle={selectedToggle}
                setError={setError}
                handleChange={handleChangeToggle}
              />
            </div>
            <Button isSecondary classNames={leagueTakeoverLayoutStyles.button}>
              Create League
            </Button>
          </form>
        </>
      )}
    </Takeover>
  );
}
