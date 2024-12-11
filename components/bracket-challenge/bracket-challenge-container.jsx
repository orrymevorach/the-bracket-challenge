import RoundButtons from './RoundButtons/RoundButtons';
import { useState } from 'react';
import SetBracketName from './set-bracket-name/set-bracket-name';
import styles from './bracket-challenge-container.module.scss';
import BracketChallenge from './bracket-challenge';
import MatchupsNotAvailable from './matchups-not-available/matchups-not-available';
import Layout from '../shared/Layout/Layout';
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
