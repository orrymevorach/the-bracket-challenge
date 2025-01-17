import { isEven, formatName } from '@/utils/utils';
import styles from './player.module.scss';
import { useMatchups } from 'context/matchup-context/matchup-context';
import Image from 'next/image';
import clsx from 'clsx';
import { mapRoundToPoints } from '@/pages/api/rankings/bracket-ranking-utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PlayerModal from './player-modal/player-modal';
import { useWindowSize } from '@/context/window-size-context/window-size-context';
import Loader from '@/components/shared/Loader/Loader';
import { useUser } from '@/context/user-context/user-context';
import { useRouter } from 'next/router';

const scrollToNextMatchup = ({ matchups, matchupId, matchupRefs }) => {
  const currentIndex = matchups.findIndex(
    matchup => matchup.matchupId === matchupId
  );
  const nextIndex = currentIndex + 1;
  const nextMatchup = matchups[nextIndex];
  const nextMatchupId = nextMatchup?.matchupId;
  if (nextMatchup && matchupRefs.current[nextMatchupId]) {
    matchupRefs.current[nextMatchup.matchupId].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }
};

export default function Player(player) {
  const user = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { name, matchupId, isChampion, winnerName, position } = player;

  const {
    setWinner,
    snowboarders,
    currentRoundIndex,
    currentContest: { lockBrackets, enableSelections, matchups },
    matchupRefs,
  } = useMatchups();
  const [showInfoModal, setShowInfoModal] = useState(false);

  const isSelectionsEnabled =
    lockBrackets === 'False' && enableSelections === 'True';
  const { isMobile } = useWindowSize();

  const winner = winnerName ? snowboarders[winnerName] : '';

  const { firstName, lastName } =
    name && typeof name === 'string' ? formatName(name) : '';

  const { firstName: winnerFirstName, lastName: winnerLastName } = winner?.name
    ? formatName(winner.name)
    : '';

  const snowboarder = snowboarders[name];
  const flagImage = snowboarder?.flag && snowboarder.flag[0];
  const winnerFlag = winner ? winner.flag[0] : '';
  const flagToShow = winnerFlag || flagImage;

  const isCorrect = winner && winner.name === name;

  // The position will either be 1 or 2, 1 for the top bracket 2 for the bottom bracket
  const isPositionEven = isEven(position);

  //
  const round = matchupId?.split('_M')[0].replace('R', '');
  const pointsWonForCorrectPick = mapRoundToPoints[round - 1];

  const userBrackets = user?.brackets;
  const bracketId = router.query.bracketId;
  const isCurrentUsersBracket = userBrackets?.includes(bracketId);

  const handleClick = async () => {
    if (isCurrentUsersBracket && isSelectionsEnabled) {
      setIsLoading(true);
      await setWinner({ player: name, matchupId, currentRoundIndex });
      setIsLoading(false);
      scrollToNextMatchup({ matchups, matchupId, matchupRefs });
    }
    return;
  };

  return (
    <>
      {showInfoModal && (
        <PlayerModal player={snowboarder} setShowInfoModal={setShowInfoModal} />
      )}
      <div className={styles.outerContainer}>
        {round === '1' && (
          <button
            className={styles.infoButton}
            onClick={() => setShowInfoModal(true)}
          >
            <FontAwesomeIcon
              icon={faInfoCircle}
              className={styles.infoIcon}
              color="#fff"
              size={isMobile ? 'lg' : 'sm'}
            />
          </button>
        )}
        <div>
          {isChampion && winner && <p className={styles.trophy}>🏆</p>}
          {winner && !isCorrect && !isPositionEven && (
            <p className={styles.strikethrough}>
              {firstName} {lastName}
            </p>
          )}
          {winner && isCorrect && !isPositionEven && !isChampion && (
            <p className={styles.pointsWon}>+{pointsWonForCorrectPick} pts</p>
          )}
          <button
            className={clsx(
              styles.playerContainer,
              isCorrect && styles.greenBorder,
              winner && !isCorrect && styles.redBorder,
              isCurrentUsersBracket &&
                isSelectionsEnabled &&
                styles.isSelectionsEnabled
            )}
            onClick={handleClick}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <div className={styles.textFlagContainer}>
                {winner && !isCorrect ? (
                  <div>
                    <p className={styles.playerName}>{winnerFirstName}</p>
                    <p className={styles.playerName}>{winnerLastName}</p>
                  </div>
                ) : (
                  <div>
                    <p className={styles.playerName}>{firstName}</p>
                    <p className={styles.playerName}>{lastName}</p>
                  </div>
                )}
                {flagToShow?.url && (
                  <Image
                    src={flagToShow.url}
                    alt="hometown flag"
                    className={styles.flag}
                    width="50"
                    height="50"
                  />
                )}
              </div>
            )}
          </button>
          {(winner && isCorrect && isPositionEven) ||
          (winner && isCorrect && !isPositionEven && isChampion) ? (
            <p className={styles.pointsWon}>+{pointsWonForCorrectPick} pts</p>
          ) : (
            ''
          )}
          {winner && !isCorrect && isPositionEven && (
            <p className={styles.strikethrough}>
              {firstName} {lastName}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
