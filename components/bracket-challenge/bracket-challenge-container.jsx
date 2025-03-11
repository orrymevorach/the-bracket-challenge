import RoundButtons from './RoundButtons/RoundButtons';
import { useState } from 'react';
import styles from './bracket-challenge-container.module.scss';
import BracketChallenge from './bracket-challenge';
import MatchupsNotAvailable from './matchups-not-available/matchups-not-available';
import Layout from '../shared/Layout/Layout';
import { useMatchups } from '@/context/matchup-context/matchup-context';
import BracketsLocked from './brackets-locked/brackets-locked';
import { useWindowSize } from '@/context/window-size-context/window-size-context';
import RotatePhoneTakeover from './rotate-phone-takeover/rotate-phone-takeover';
import { useUser } from '@/context/user-context/user-context';
import Loader from '../shared/Loader/Loader';
import ProgressBar from './ProgressBar/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import EditBracketNameTakeover from './EditBracketNameTakeover/EditBracketNameTakeover';
import Trivia from './Trivia/Trivia';
import { useRouter } from 'next/router';
import Session from './Session/Session';

const NavChildren = ({
  bracket,
  currentContest,
  sport,
  isCurrentUsersBracket,
  setShowEditBracketNameTakeover,
}) => (
  <div className={styles.navChildren}>
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
    <div className={styles.bracketNameContainer}>
      <p className={styles.bracketName}>{bracket.name} </p>
      {isCurrentUsersBracket && (
        <button
          className={styles.editButton}
          onClick={() => setShowEditBracketNameTakeover(true)}
        >
          <FontAwesomeIcon
            icon={faEdit}
            color="white"
            className={styles.editIcon}
          />
        </button>
      )}
    </div>
  </div>
);

export default function BracketChallengeContainer() {
  const { contests, currentContest, bracket } = useMatchups();
  const [showEditBracketNameTakeover, setShowEditBracketNameTakeover] =
    useState(false);

  const user = useUser();
  const { isMobile } = useWindowSize();
  const router = useRouter();

  if (!bracket || !user) return <Loader isFullPage isBrackets />;

  const hasMatchups = currentContest?.matchups?.length > 0;
  const hasTrivia = currentContest?.questions?.length > 0;
  const hasSessions = !!currentContest?.session;
  const isSelectionsEnabled = currentContest?.enableSelections === 'True';
  const isCurrentUsersBracket = user?.brackets?.includes(bracket.id);
  const isBracketLocked = currentContest?.lockBrackets === 'True';
  const sport = currentContest ? currentContest.sport : router.query.slug;

  return (
    <Layout
      removeWrapper
      NavChildren={() => (
        <NavChildren
          sport={sport}
          currentContest={currentContest}
          bracket={bracket}
          isCurrentUsersBracket={isCurrentUsersBracket}
          setShowEditBracketNameTakeover={setShowEditBracketNameTakeover}
        />
      )}
    >
      <RoundButtons contests={contests} />
      <div className={styles.container}>
        {isMobile && <RotatePhoneTakeover />}
        {isCurrentUsersBracket &&
          !isBracketLocked &&
          currentContest &&
          isSelectionsEnabled && <ProgressBar />}
        {isBracketLocked && isCurrentUsersBracket && <BracketsLocked />}
        {!isSelectionsEnabled && <MatchupsNotAvailable />}
        {hasMatchups && isSelectionsEnabled && <BracketChallenge />}
        {hasTrivia && isSelectionsEnabled && <Trivia />}
        {hasSessions && isSelectionsEnabled && <Session />}
      </div>
      {showEditBracketNameTakeover && (
        <EditBracketNameTakeover
          setShowTakeover={setShowEditBracketNameTakeover}
          bracket={bracket}
          sport={sport}
        />
      )}
    </Layout>
  );
}
