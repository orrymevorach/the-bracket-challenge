import RoundButtons from '../LeaguePage/RoundButtons/RoundButtons';
import { useEffect, useState } from 'react';
import SetBracketName from './set-bracket-name/set-bracket-name';
import Loader from '../shared/Loader/Loader';
import styles from './bracket-challenge-container.module.scss';
import { useRouter } from 'next/router';
import { ROUNDS, ROUND_SUFFIXES, ROUTES } from '@/utils/constants';
import BracketChallenge from './bracket-challenge';
import { useConfig } from '@/context/config-context/config-context';
import MatchupsNotAvailable from './matchups-not-available/matchups-not-available';
import Layout from '../shared/Layout/Layout';
import { updateUserBracket } from '@/lib/airtable';
import Button from '../shared/Button/Button';
import { useMatchups } from '@/context/matchup-context/matchup-context';
import TopRow from './top-row/top-row';
import ConfirmationTakeover from './confirmation-takeover/confirmation-takeover';
import BracketsLocked from './brackets-locked/brackets-locked';
import { useWindowSize } from '@/context/window-size-context/window-size-context';
import RotatePhoneTakeover from './rotate-phone-takeover/rotate-phone-takeover';

// Display options:
// 1. regular - doesn't affect anything, more of a placeholder
// 2. short - used for shortened rounds where there is only one round per matchup
// 3. mirror - used when we want to split the brackets and mirror them on the screen

const mapRoundNameToBracketConfig = {
  Duels: {
    numberOfColumns: 1,
    championRound: 2,
    display: 'short',
  },
  DuelsWomen: {
    numberOfColumns: 1,
    championRound: 2,
    display: 'short',
  },
  Revelstoke: {
    numberOfColumns: 2,
    championRound: 2,
    display: 'mirror',
  },
  RevelstokeWomen: {
    numberOfColumns: 2,
    championRound: 2,
    display: 'mirror',
  },
  Selkirk: {
    numberOfColumns: 3,
    championRound: 4,
    display: 'regular',
  },
  SelkirkWomen: {
    numberOfColumns: 2,
    championRound: 3,
    display: 'regular',
  },
};

export default function BracketChallengeContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRound, setCurrentRound] = useState(ROUNDS[0]);
  const [isSettingName, setIsSettingName] = useState(true); // Reveals the set name modal
  const [isSubmitting, setIsSubmitting] = useState(false); // Handles load on the submit button
  const [showConfirmationTakeover, setShowConfirmationTakeover] =
    useState(false);
  const { matchups } = useMatchups();
  const { isMobile } = useWindowSize();
  const currentRoundName = currentRound.name;

  const router = useRouter();
  const bracketRecId = router.query.bracketId;
  const leagueId = router.query.leagueId;

  const {
    config: { showMatchups, isSelectionsEnabled, isCurrentUsersBracket },
  } = useConfig();

  // User is required to give a bracket a name if no record ID exists for the bracket
  useEffect(() => {
    if (bracketRecId) {
      setIsSettingName(false);
    }
  }, [router, bracketRecId]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const rounds = Object.entries(matchups).reduce((acc, curr) => {
      const [roundName, roundMatchups] = curr;
      for (let matchup of roundMatchups) {
        const suffix = ROUND_SUFFIXES[roundName];
        const key = `${suffix}${matchup.matchupId}`;
        if (matchup.winner) {
          acc[key] = matchup.winner;
        }
      }
      return acc;
    }, {});

    await updateUserBracket({ rounds, id: router.query.bracketId });
    setIsSubmitting(false);
    setShowConfirmationTakeover(true);
  };

  const isMatchupsLoaded = matchups && matchups[currentRoundName];

  return (
    <Layout
      backButtonText={leagueId ? 'Back to league page' : ''}
      backButtonHref={
        leagueId ? `/league/${leagueId}?leagueId=${leagueId}` : ''
      }
    >
      {isSettingName ? (
        <SetBracketName setIsSettingName={setIsSettingName} />
      ) : (
        <>
          <div className={styles.container}>
            {isMobile && <RotatePhoneTakeover />}

            <TopRow bracketRecId={bracketRecId} leagueId={leagueId} />
            <RoundButtons
              currentRound={currentRound}
              setCurrentRound={setCurrentRound}
              setIsLoading={setIsLoading}
            />
            {!isSelectionsEnabled &&
              isMatchupsLoaded &&
              isCurrentUsersBracket && (
                <BracketsLocked currentRoundName={currentRoundName} />
              )}
            {!isLoading && !showMatchups && (
              <MatchupsNotAvailable currentRoundName={currentRoundName} />
            )}
            {isLoading ? (
              <Loader classNames={styles.loader} />
            ) : (
              <>
                <BracketChallenge
                  currentRound={currentRoundName}
                  bracketConfig={mapRoundNameToBracketConfig[currentRoundName]}
                />
                <BracketChallenge
                  currentRound={`${currentRoundName}Women`}
                  bracketConfig={
                    mapRoundNameToBracketConfig[`${currentRoundName}Women`]
                  }
                />
                {isMatchupsLoaded && showMatchups && isSelectionsEnabled && (
                  <Button
                    classNames={styles.submitButton}
                    handleClick={handleSubmit}
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                )}
              </>
            )}
          </div>
        </>
      )}
      {showConfirmationTakeover && (
        <ConfirmationTakeover
          leagueId={leagueId}
          setShowConfirmationTakeover={setShowConfirmationTakeover}
        />
      )}
    </Layout>
  );
}
