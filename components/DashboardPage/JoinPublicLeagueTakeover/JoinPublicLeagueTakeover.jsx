import { useState } from 'react';
import { joinLeague } from '@/lib/firebase';
import { useUser } from 'context/user-context/user-context';
import { ROUTES } from '@/utils/constants';
import Takeover from '@/components/shared/Takeover/Takeover';
import Loader from '@/components/shared/Loader/Loader';
import leagueTakeoverLayoutStyles from '@/components/shared/LeagueTakeoverLayout/LeagueTakeoverLayout.module.scss';
import clsx from 'clsx';
import Button from '@/components/shared/Button/Button';
import styles from './JoinPublicLeagueTakeover.module.scss';
import Toggle from '@/components/shared/Toggle/Toggle';

export default function JoinPublicLeagueTakeover({ setShowTakeover, sports }) {
  const [selectedToggle, setSelectedToggle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedToggle) {
      setError('Please fill out all fields');
      return;
    }
    setIsLoading(true);
    const currentSport = sports.find(({ name }) => name === selectedToggle);
    const openLeagueId = currentSport?.openLeagueId[0];

    const bracket = await joinLeague({
      leagueId: openLeagueId,
      user,
    });

    window.location = `${ROUTES.BRACKET_CHALLENGE}/${currentSport.name}?leagueId=${openLeagueId}&bracketId=${bracket.id}`;
  };

  const handleChangeToggle = value => {
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
          <p className={leagueTakeoverLayoutStyles.title}>Join Public League</p>
          <form
            action="#"
            onSubmit={e => handleSubmit(e)}
            className={leagueTakeoverLayoutStyles.form}
          >
            <div className={styles.toggleContainer}>
              {error && <p className={styles.error}>Error</p>}
              <Toggle
                sports={sports}
                selectedToggle={selectedToggle}
                handleChange={handleChangeToggle}
              />
            </div>
            <Button isSecondary classNames={leagueTakeoverLayoutStyles.button}>
              Join League
            </Button>
          </form>
        </>
      )}
    </Takeover>
  );
}
