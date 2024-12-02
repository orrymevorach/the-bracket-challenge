import { isEven } from '@/utils/utils';
import styles from './player.module.scss';
import { useMatchups } from 'context/matchup-context/matchup-context';
import Image from 'next/image';
import clsx from 'clsx';
import { useConfig } from '@/context/config-context/config-context';
import { mapRoundToPoints } from '@/components/DashboardPage/bracket-ranking-utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PlayerModal from './player-modal/player-modal';
import { useWindowSize } from '@/context/window-size-context/window-size-context';

export default function Player(player) {
  const { name, matchupId, isChampion, winnerName, position, flag } = player;

  const { setWinner, snowboarders, currentRoundIndex } = useMatchups();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const isSelectionsEnabled = true; // TEMPORARY
  const { isMobile } = useWindowSize();

  const winner = winnerName ? snowboarders[winnerName] : '';

  const [firstName, lastName] = name ? name.split(' ') : '';
  const [winnerFirstName, winnerLastName] = winner
    ? winner?.name.split(' ')
    : '';

  const flagImage = flag && flag.length && flag[0];
  const winnerFlag = winner ? winner.flag[0] : '';

  const isCorrect = winner && winner.name === name;

  // The position will either be 1 or 2, 1 for the top bracket 2 for the bottom bracket
  const isPositionEven = isEven(position);

  //
  const round = matchupId?.split('_M')[0].replace('R', '');
  const pointsWonForCorrectPick = mapRoundToPoints[round - 1];

  const handleClick = () => {
    if (!isSelectionsEnabled) return;
    setWinner({ player: name, matchupId, currentRoundIndex });
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
              isSelectionsEnabled && styles.isSelectionsEnabled
            )}
            onClick={handleClick}
          >
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
              {flagImage && (
                <Image
                  src={winnerFlag?.url || flagImage.url}
                  alt="hometown flag"
                  className={styles.flag}
                  width="50"
                  height="50"
                />
              )}
            </div>
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
