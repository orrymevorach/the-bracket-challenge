// Display options:
// 1. regular - doesn't affect anything, more of a placeholder
// 2. short - used for shortened rounds where there is only one round per matchup
// 3. mirror - used when we want to split the brackets and mirror them on the screen

import RoundButtons from './RoundButtons/RoundButtons';
import { useState } from 'react';
import SetBracketName from './set-bracket-name/set-bracket-name';
import styles from './bracket-challenge-container.module.scss';
import BracketChallenge from './bracket-challenge';
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
import { useUser } from '@/context/user-context/user-context';
import Loader from '../shared/Loader/Loader';

export default function BracketChallengeContainer() {
  const { contests, currentContest, bracket } = useMatchups();
  const [isSettingName, setIsSettingName] = useState(false); // Reveals the set name modal
  const [showConfirmationTakeover, setShowConfirmationTakeover] =
    useState(false);

  const user = useUser();
  const { isMobile } = useWindowSize();

  if (!bracket || !user) return <Loader isFullPage />;

  // const handleSubmit = async () => {
  //   setIsSubmitting(true);
  //   const rounds = Object.entries(matchups).reduce((acc, curr) => {
  //     const [roundName, roundMatchups] = curr;
  //     for (let matchup of roundMatchups) {
  //       const suffix = ROUND_SUFFIXES[roundName];
  //       const key = `${suffix}${matchup.matchupId}`;
  //       if (matchup.winner) {
  //         acc[key] = matchup.winner;
  //       }
  //     }
  //     return acc;
  //   }, {});

  //   await updateUserBracket({ rounds, id: router.query.bracketId });
  //   setIsSubmitting(false);
  //   setShowConfirmationTakeover(true);
  // };

  const hasMatchups = currentContest?.matchups?.length > 0;
  const isSelectionsEnabled = currentContest?.enableSelections === 'True';
  const isCurrentUsersBracket = user?.brackets?.includes(bracket.id);
  const isBracketLocked = currentContest?.lockBrackets === 'True';

  return (
    <Layout>
      {isSettingName ? (
        <SetBracketName setIsSettingName={setIsSettingName} />
      ) : (
        <div className={styles.container}>
          {isMobile && <RotatePhoneTakeover />}

          <TopRow />
          <RoundButtons contests={contests} />
          {isBracketLocked && isCurrentUsersBracket && <BracketsLocked />}
          {hasMatchups && isSelectionsEnabled ? (
            <BracketChallenge />
          ) : (
            <MatchupsNotAvailable />
          )}

          {/* {isMatchupsLoaded && showMatchups && isSelectionsEnabled && (
                  <Button
                    classNames={styles.submitButton}
                    handleClick={handleSubmit}
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                )} */}
        </div>
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
