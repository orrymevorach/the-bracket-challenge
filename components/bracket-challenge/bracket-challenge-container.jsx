import RoundButtons from '../league/round-buttons/round-buttons';
import { useState } from 'react';
import BracketChallenge from './bracket-challenge';
import Loader from '../shared/loader/loader';
import Input from '../shared/input/input';
import Button from '../shared/button/button';
import styles from './bracket-challenge-container.module.scss';
import { createBracket } from '@/lib/airtable';
import useUser from '@/context/user-context/useUser';

export const ROUNDS = [
  {
    displayName: 'NST Duels',
    name: 'Duels',
  },
  {
    displayName: 'Revelstoke Mountain Resort',
    name: 'Revelstoke',
  },
  {
    displayName: 'Selkirk Tangiers',
    name: 'Selkirk',
  },
];

function SetBracketName({ setIsSettingName }) {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [bracketName, setBracketName] = useState('');

  const handleSubmitForm = async e => {
    e.preventDefault();
    setIsLoading(true);
    await createBracket({ name: bracketName, memberId: user.id });
    setIsSettingName(false);
  };

  return (
    <div className={styles.bracketNameContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <p className={styles.title}>Enter bracket name</p>
          <form
            action="#"
            onSubmit={e => handleSubmitForm(e)}
            className={styles.form}
          >
            <Input
              type="text"
              id="input"
              value={bracketName}
              handleChange={e => setBracketName(e.target.value)}
              classNames={styles.input}
              labelClassNames={styles.label}
            />
            <Button classNames={styles.button}>Submit</Button>
          </form>
        </>
      )}
    </div>
  );
}

export default function BracketChallengeContainer() {
  const [currentRound, setCurrentRound] = useState(ROUNDS[0]);
  const [isSettingName, setIsSettingName] = useState(true);
  return (
    <>
      {isSettingName ? (
        <SetBracketName setIsSettingName={setIsSettingName} />
      ) : (
        <>
          <RoundButtons
            currentRound={currentRound}
            setCurrentRound={setCurrentRound}
            rounds={ROUNDS}
          />
          <BracketChallenge />
        </>
      )}
    </>
  );
}
