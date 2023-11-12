import { useState } from 'react';
import styles from './create-league-takeover.module.scss';
import { createLeague } from '@/lib/airtable';
import { useUser } from 'context/user-context/user-context';
import Loader from 'components/shared/loader/loader';
import Button from '../../shared/button/button';
import Input from '../../shared/input/input';
import Takeover from '../../shared/takeover/takeover';
import { ROUTES } from '@/utils/constants';

export default function CreateLeagueTakeover({ setShowTakeover }) {
  const [leagueName, setLeagueName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const response = await createLeague({
      name: leagueName,
      memberRecordId: user.id,
    });
    setIsLoading(false);
    window.location = `${ROUTES.LEAGUE}/${response.id}`;
  };

  return (
    <Takeover
      handleClose={() => setShowTakeover(false)}
      modalClassNames={styles.container}
    >
      {isLoading ? (
        <Loader color="black" />
      ) : (
        <>
          <p className={styles.title}>Create League</p>
          <form
            action="#"
            onSubmit={e => handleSubmit(e)}
            className={styles.form}
          >
            <Input
              handleChange={e => setLeagueName(e.target.value)}
              type="text"
              id="leagueName"
              name="leagueName"
              value={leagueName}
              classNames={styles.input}
              label="Enter a name for your league"
              labelClassNames={styles.label}
            />
            <Button classNames={styles.button}>Create League</Button>
          </form>
        </>
      )}
    </Takeover>
  );
}
