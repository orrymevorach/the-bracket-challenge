import RoundButtons from '../league/round-buttons/round-buttons';
import { useEffect, useState } from 'react';
import SetBracketName from './set-bracket-name/set-bracket-name';
import Loader from '../shared/loader/loader';
import styles from './bracket-challenge-container.module.scss';
import { useRouter } from 'next/router';
import RevelstokeBracket from './revelstoke-bracket/revelstoke-bracket';

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

const ROUND_NAMES = {
  DUELS: 'Duels',
  REVELSTOKE: 'Revelstoke',
  SELKIRK: 'Selkirk',
};

const { DUELS, REVELSTOKE, SELKIRK } = ROUND_NAMES;

export default function BracketChallengeContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRound, setCurrentRound] = useState(ROUNDS[0]);
  const currentRoundName = currentRound.name;
  const [isSettingName, setIsSettingName] = useState(true);

  const router = useRouter();
  useEffect(() => {
    if (router.query.bracketId) {
      setIsSettingName(false);
    }
  }, [router]);
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
            setIsLoading={setIsLoading}
            classNames={styles.roundButtons}
          />
          {isLoading && <Loader />}
          {!isLoading && currentRoundName === REVELSTOKE && (
            <RevelstokeBracket />
          )}
        </>
      )}
    </>
  );
}
