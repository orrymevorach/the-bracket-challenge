import RoundButtons from '../league/round-buttons/round-buttons';
import { useEffect, useState } from 'react';
import SetBracketName from './set-bracket-name/set-bracket-name';
import Loader from '../shared/loader/loader';
import styles from './bracket-challenge-container.module.scss';
import { useRouter } from 'next/router';
import { ROUNDS } from '@/utils/constants';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';
import BracketChallenge from './bracket-challenge';
import { useSnowboarders } from '@/context/snowboarders-context/snowboarders-context';
import GenderButtons, { GENDERS } from './gender-buttons/gender-buttons';
import { useWinners } from '@/context/winners-context/winners-context';
import useGetUserBracketSelections from '@/context/matchup-context/useGetUserBracketSelections';

export default function BracketChallengeContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRound, setCurrentRound] = useState(ROUNDS[0]);
  const currentRoundName = currentRound.name;
  const [isSettingName, setIsSettingName] = useState(true);
  const [gender, setGender] = useState('male');
  const snowboarders = useSnowboarders();
  const winners = useWinners();

  const router = useRouter();
  const bracketRecId = router.query.bracketId;
  const bracketSelectionsSortedByRound = useGetUserBracketSelections({
    recId: bracketRecId,
  });

  // User is required to give a bracket a name if no record ID exists for the bracket
  useEffect(() => {
    if (bracketRecId) {
      setIsSettingName(false);
    }
  }, [router, bracketRecId]);

  const currentWomensRoundName = `${currentRoundName}Women`;
  const mapRoundToBracketConfig = {
    Duels: 'sixteenSingle',
    DuelsWomen: 'eightSingle',
    Revelstoke: 'eightMulti',
    RevelstokeWomen: 'fourMulti',
    Selkirk: 'eightMulti',
    SelkirkWomen: 'fourMulti',
  };

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
          <GenderButtons
            setGender={setGender}
            setIsLoading={setIsLoading}
            gender={gender}
          />
          {isLoading ? (
            <Loader classNames={styles.loader} />
          ) : (
            <>
              {gender === GENDERS.MALE ? (
                <MatchupDataProvider
                  snowboarders={snowboarders[currentRoundName]}
                  winners={winners}
                  userBracketSelections={
                    bracketSelectionsSortedByRound[currentRoundName]
                  }
                >
                  <BracketChallenge
                    currentRound={currentRoundName}
                    bracketConfig={mapRoundToBracketConfig[currentRoundName]}
                  />
                </MatchupDataProvider>
              ) : (
                <MatchupDataProvider
                  snowboarders={snowboarders[currentWomensRoundName]}
                  winners={winners}
                  userBracketSelections={
                    bracketSelectionsSortedByRound[currentWomensRoundName]
                  }
                >
                  <BracketChallenge
                    currentRound={currentWomensRoundName}
                    bracketConfig={
                      mapRoundToBracketConfig[currentWomensRoundName]
                    }
                  />
                </MatchupDataProvider>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
