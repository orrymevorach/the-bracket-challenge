import RoundButtons from './RoundButtons/RoundButtons';
import { useState } from 'react';
import styles from './bracket-challenge-container.module.scss';
import BracketChallenge from './bracket-challenge';
import MatchupsNotAvailable from './matchups-not-available/matchups-not-available';
import Layout from '../shared/Layout/Layout';
import { useMatchups } from '@/context/matchup-context/matchup-context';
import ConfirmationTakeover from './confirmation-takeover/confirmation-takeover';
import BracketsLocked from './brackets-locked/brackets-locked';
import { useWindowSize } from '@/context/window-size-context/window-size-context';
import RotatePhoneTakeover from './rotate-phone-takeover/rotate-phone-takeover';
import { useUser } from '@/context/user-context/user-context';
import Loader from '../shared/Loader/Loader';
import ProgressBar from './ProgressBar/ProgressBar';

const NavChildren = ({ bracket, currentContest, sport }) => (
  <div>
    <p
      className={styles.sport}
      style={{
        color: currentContest?.color,
        WebkitTextStroke: currentContest?.textStrokeColor
          ? `1px ${currentContest?.textStrokeColor}`
          : '',
      }}
    >
      {sport}
    </p>
    <p className={styles.bracketName}>{bracket.name}</p>
  </div>
);

export default function BracketChallengeContainer() {
  const { contests, currentContest, bracket } = useMatchups();
  const [showConfirmationTakeover, setShowConfirmationTakeover] =
    useState(false);

  const user = useUser();
  const { isMobile } = useWindowSize();

  if (!bracket || !user) return <Loader isFullPage />;

  const hasMatchups = currentContest?.matchups?.length > 0;
  const isSelectionsEnabled = currentContest?.enableSelections === 'True';
  const isCurrentUsersBracket = user?.brackets?.includes(bracket.id);
  const isBracketLocked = currentContest?.lockBrackets === 'True';
  const sport = currentContest.sport[0];

  return (
    <Layout
      removeWrapper
      NavChildren={() => (
        <NavChildren
          sport={sport}
          currentContest={currentContest}
          bracket={bracket}
        />
      )}
    >
      <RoundButtons contests={contests} />
      <div className={styles.container}>
        {isMobile && <RotatePhoneTakeover />}
        {isCurrentUsersBracket && !isBracketLocked && <ProgressBar />}
        {isBracketLocked && isCurrentUsersBracket && <BracketsLocked />}
        {hasMatchups && isSelectionsEnabled ? (
          <BracketChallenge />
        ) : (
          <MatchupsNotAvailable />
        )}
      </div>
      {showConfirmationTakeover && (
        <ConfirmationTakeover
          leagueId={leagueId}
          setShowConfirmationTakeover={setShowConfirmationTakeover}
        />
      )}
    </Layout>
  );
}
