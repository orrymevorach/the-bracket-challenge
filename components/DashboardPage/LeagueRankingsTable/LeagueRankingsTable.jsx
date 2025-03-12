import { ROUTES } from '@/utils/constants';
import styles from './LeagueRankingsTable.module.scss';
import tableStyles from '@/components/shared/Table/Table.module.scss';
import { useRouter } from 'next/router';
import Button from '@/components/shared/Button/Button';
import { useUser } from '@/context/user-context/user-context';
import clsx from 'clsx';
import InviteMemberTakeover from '@/components/DashboardPage/InviteMemberTakeover/InviteMemberTakeover';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import useWindowSize from '@/hooks/useWindowSize';
import ChatroomTakeover from '../ChatroomTakeover/ChatroomTakeover';
import { compareArrays } from '@/utils/utils';

export default function LeagueRankingsTable({
  leagueData,
  sports,
  isOpenLeague,
}) {
  const router = useRouter();
  const user = useUser();
  const { isMobile } = useWindowSize();
  const [showInviteMemberTakeover, setShowInviteMemberTakeover] =
    useState(false);
  const [showChatroomTakeover, setShowChatroomTakeover] = useState(false);

  const currentContest = sports?.find(({ name }) => leagueData.sport === name);

  const brackets = leagueData.json || [];
  const leagueAdmin = leagueData?.admin;
  const isAdmin = leagueAdmin && user.id === leagueAdmin;

  const isSelectionsEnabled =
    currentContest?.enableSelectionsLookup?.includes('True');

  const isBracketLocked = compareArrays(
    currentContest?.enableSelectionsLookup,
    currentContest?.lockBracketsLookup
  );

  const titleHeadings =
    isMobile && isSelectionsEnabled
      ? [
          { title: 'Rank', classNames: tableStyles.rank },
          { title: 'Team Name' },
        ]
      : [
          { title: 'Rank', classNames: tableStyles.rank },
          { title: 'Team Name' },
          { title: 'Total Points' },
          { title: 'Correct Picks' },
          // { title: 'Dark Horse' },
        ];
  return (
    <>
      {showInviteMemberTakeover && (
        <InviteMemberTakeover
          setShowTakeover={setShowInviteMemberTakeover}
          leagueData={leagueData}
        />
      )}
      {showChatroomTakeover && (
        <ChatroomTakeover
          leagueData={leagueData}
          handleClose={() => setShowChatroomTakeover(false)}
        />
      )}

      <div className={tableStyles.container}>
        <div className={tableStyles.topRow}>
          <p className={tableStyles.title}>
            {leagueData.name}{' '}
            <span
              style={{
                color: currentContest?.color,
                WebkitTextStroke: currentContest?.textStrokeColor
                  ? `1px ${currentContest?.textStrokeColor}`
                  : 'initial',
              }}
            >
              {leagueData.sport}
            </span>
          </p>
          <div className={tableStyles.topRowButtonsContainer}>
            {isAdmin && (
              <Button
                isPurple
                classNames={tableStyles.inviteButton}
                handleClick={() => setShowInviteMemberTakeover(true)}
              >
                Invite Member <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            )}
            {!isOpenLeague && (
              <Button
                isPurple
                classNames={clsx(tableStyles.inviteButton)}
                handleClick={() => setShowChatroomTakeover(true)}
              >
                Chatroom <FontAwesomeIcon icon={faMessage} />
              </Button>
            )}
          </div>
        </div>
        <div className={tableStyles.innerContainer}>
          <table className={tableStyles.table}>
            <thead>
              <tr className={tableStyles.titleRow}>
                {titleHeadings.map(({ title, classNames }, index) => {
                  const width =
                    index === 0
                      ? 'auto'
                      : `${100 / (titleHeadings.length - 1)}%`;
                  return (
                    <th key={title} className={classNames} style={{ width }}>
                      {title}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {brackets
                .sort((a, b) => {
                  let aRank = a.rankData?.rank;
                  let bRank = b.rankData?.rank;
                  if (aRank > bRank) return 1;
                  return -1;
                })
                .map(bracket => {
                  const { rankData, bracketName } = bracket;
                  const totalPoints = rankData?.totalPoints || 0;
                  const rank = rankData?.rank;
                  const numberOfWinners = rankData?.numberOfWinners || 0;
                  const correctPicks = rankData?.correctPicks || 0;

                  return (
                    <tr key={`row-${leagueData.id}-${bracketName}`}>
                      <td className={tableStyles.rank}>
                        <p
                          className={tableStyles.number}
                          style={{
                            backgroundColor:
                              currentContest?.secondaryColor ||
                              currentContest?.color,
                          }}
                        >
                          {rank}
                        </p>
                      </td>
                      <td>
                        <p>{bracketName}</p>
                      </td>
                      {!isMobile && isSelectionsEnabled && (
                        <>
                          <td>{totalPoints}</td>
                          <td>
                            {correctPicks}/{numberOfWinners}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className={tableStyles.buttonsContainer}>
            {brackets.map(bracket => {
              const isCurrentUsersBracket = user.brackets?.includes(bracket.id);
              const isBracketEditable =
                isCurrentUsersBracket &&
                isSelectionsEnabled &&
                !isBracketLocked;
              const buttonText = isBracketEditable
                ? 'Edit Bracket'
                : 'View Bracket';

              const showButton =
                (isCurrentUsersBracket && isSelectionsEnabled) ||
                (!isCurrentUsersBracket &&
                  isSelectionsEnabled &&
                  isBracketLocked);

              return (
                <div
                  className={tableStyles.buttonContainer}
                  key={`button-${bracket.id}-${bracket.name}`}
                >
                  {showButton && (
                    <Button
                      classNames={clsx(
                        tableStyles.button,
                        isBracketEditable && tableStyles.pulse
                      )}
                      style={{
                        backgroundColor:
                          currentContest?.secondaryColor ||
                          currentContest?.color,
                        border: `1px solid ${
                          currentContest?.secondaryColor ||
                          currentContest?.color
                        }`,
                      }}
                      handleClick={() =>
                        router.push({
                          pathname: `${
                            ROUTES.BRACKET_CHALLENGE
                          }/${leagueData.sport.toLowerCase()}`,
                          query: {
                            leagueId: leagueData.id,
                            bracketId: bracket.id,
                          },
                        })
                      }
                    >
                      {buttonText}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
