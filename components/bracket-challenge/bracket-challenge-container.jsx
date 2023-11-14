import RoundButtons from '../league/round-buttons/round-buttons';
import { useEffect, useState } from 'react';
import SetBracketName from './set-bracket-name/set-bracket-name';
import Loader from '../shared/loader/loader';
import styles from './bracket-challenge-container.module.scss';
import { useRouter } from 'next/router';
import RevelstokeBracket from './revelstoke-bracket/revelstoke-bracket';
import SelkirkBracket from './selkirk-bracket/selkirk-bracket';
import { ROUND_NAMES } from '@/utils/constants';

const { DUELS, REVELSTOKE, SELKIRK } = ROUND_NAMES;
export const ROUNDS = [
  {
    displayName: 'NST Duels',
    name: DUELS,
  },
  {
    displayName: 'Revelstoke Mountain Resort',
    name: REVELSTOKE,
  },
  {
    displayName: 'Selkirk Tangiers',
    name: SELKIRK,
  },
];

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
          {!isLoading && currentRoundName === SELKIRK && <SelkirkBracket />}
        </>
      )}
    </>
  );
}
