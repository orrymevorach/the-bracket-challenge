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
import useGetUserBracketSelections from '@/context/matchup-context/useGetUserBracketSelections';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const mapRoundNameToBracketConfig = {
  Duels: { numberOfColumns: 2, display: 'mirror' },
  DuelsWomen: { numberOfColumns: 2, display: 'mirror' },
  Revelstoke: { numberOfColumns: 4, display: 'regular' },
  RevelstokeWomen: { numberOfColumns: 2, display: 'regular' },
  Selkirk: { numberOfColumns: 4, display: 'regular' },
  SelkirkWomen: { numberOfColumns: 2, display: 'regular' },
};

export default function BracketChallengeContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRound, setCurrentRound] = useState(ROUNDS[0]);
  const [isSettingName, setIsSettingName] = useState(true);
  const [gender, setGender] = useState(GENDERS.MALE);
  const snowboarders = useSnowboarders();

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

  const currentRoundName =
    gender === GENDERS.MALE ? currentRound.name : `${currentRound.name}Women`;

  const bracketConfig = mapRoundNameToBracketConfig[currentRoundName];

  return (
    <>
      {isSettingName ? (
        <SetBracketName setIsSettingName={setIsSettingName} />
      ) : (
        <>
          <Link href="/dashboard" className={styles.backButton}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              color="#fff"
              className={styles.chevron}
            />
            <FontAwesomeIcon
              icon={faChevronLeft}
              color="#fff"
              className={styles.chevron}
            />
            <p>Back to dashboard</p>
          </Link>
          <div className={styles.container}>
            <RoundButtons
              currentRound={currentRound}
              setCurrentRound={setCurrentRound}
              rounds={ROUNDS}
              setIsLoading={setIsLoading}
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
                <MatchupDataProvider
                  snowboarders={snowboarders[currentRoundName]}
                  userBracketSelections={
                    bracketSelectionsSortedByRound[currentRoundName]
                  }
                  currentRound={currentRoundName}
                >
                  <BracketChallenge
                    currentRound={currentRoundName}
                    bracketConfig={bracketConfig}
                  />
                </MatchupDataProvider>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
