import RoundButtons from '../league/round-buttons/round-buttons';
import { useEffect, useState } from 'react';
import SetBracketName from './set-bracket-name/set-bracket-name';
import Loader from '../shared/loader/loader';
import styles from './bracket-challenge-container.module.scss';
import { useRouter } from 'next/router';
import { ROUNDS } from '@/utils/constants';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';
import BracketChallenge from './bracket-challenge';
import GenderButtons, { GENDERS } from './gender-buttons/gender-buttons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useConfig } from '@/context/config-context/config-context';
import MatchupsNotAvailable from './matchups-not-available/matchups-not-available';
import { useWindowSize } from '@/context/window-size-context/window-size-context';

const mapRoundNameToBracketConfig = {
  Duels: {
    numberOfColumns: 1,
    championRound: 2,
    display: 'regular',
  },
  DuelsWomen: {
    numberOfColumns: 1,
    championRound: 2,
    display: 'regular',
  },
  Revelstoke: {
    numberOfColumns: 3,
    championRound: 3,
    display: 'regular',
  },
  RevelstokeWomen: {
    numberOfColumns: 2,
    display: 'regular',
    championRound: 2,
  },
  Selkirk: {
    numberOfColumns: 4,
    display: 'regular',
    championRound: 3,
  },
  SelkirkWomen: {
    numberOfColumns: 2,
    display: 'regular',
    championRound: 2,
  },
};

export default function BracketChallengeContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRound, setCurrentRound] = useState(ROUNDS[0]);
  const [isSettingName, setIsSettingName] = useState(true);
  const [gender, setGender] = useState(GENDERS.MALE);
  const { isMobile } = useWindowSize();

  const router = useRouter();
  const bracketRecId = router.query.bracketId;

  const {
    config: { showMatchups },
  } = useConfig();

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
          <Link
            href={`/league/${router.query.leagueId}`}
            className={styles.backButton}
          >
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              color="#fff"
              className={styles.chevron}
              size={isMobile ? 'xl' : 'lg'}
            />
            {!isMobile && <p>Back to league dashboard</p>}
          </Link>
          <div className={styles.container}>
            <RoundButtons
              currentRound={currentRound}
              setCurrentRound={setCurrentRound}
              setIsLoading={setIsLoading}
            />
            <GenderButtons
              setGender={setGender}
              setIsLoading={setIsLoading}
              gender={gender}
            />

            {!isLoading && !showMatchups && <MatchupsNotAvailable />}
            {isLoading ? (
              <Loader classNames={styles.loader} />
            ) : (
              <MatchupDataProvider currentRound={currentRoundName}>
                <BracketChallenge
                  currentRound={currentRoundName}
                  bracketConfig={bracketConfig}
                />
              </MatchupDataProvider>
            )}
          </div>
        </>
      )}
    </>
  );
}
