import { ROUTES } from '@/utils/constants';
import tableStyles from '@/components/shared/Table/Table.module.scss';
import { useRouter } from 'next/router';
import Button from '@/components/shared/Button/Button';
import { useUser } from '@/context/user-context/user-context';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './LeagueRankingsTable.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import InviteMemberTakeover from '@/components/DashboardPage/InviteMemberTakeover/InviteMemberTakeover';
import { useState } from 'react';

export default function LeagueRankingsTable({ leagueData }) {
  const router = useRouter();
  const user = useUser();
  const [showInviteMemberTakeover, setShowInviteMemberTakeover] =
    useState(false);
  const brackets = leagueData.json;

  const leagueAdmin = leagueData?.admin && leagueData.admin[0];
  const isAdmin = leagueAdmin && user.id === leagueAdmin;

  const handleClick = ({ leagueId, bracketId }) => {
    router.push({
      pathname: ROUTES.SONG_CHALLENGE,
      query: {
        leagueId,
        bracketId,
      },
    });
  };

  const titleHeadings = [
    { title: 'Rank', classNames: tableStyles.rank },
    { title: 'Team Name' },
    { title: 'Correct Picks' },
  ];

  return (
    <>
      {showInviteMemberTakeover && (
        <InviteMemberTakeover
          setShowTakeover={setShowInviteMemberTakeover}
          leagueId={leagueData.id}
        />
      )}

      <div className={tableStyles.container}>
        <div className={tableStyles.topRow}>
          <p className={tableStyles.title}>{leagueData.name}</p>
          {isAdmin && (
            <div className={tableStyles.topRowButtonsContainer}>
              <Button
                isPurple
                isSmall
                classNames={tableStyles.inviteButton}
                handleClick={() => setShowInviteMemberTakeover(true)}
              >
                Invite Member <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </div>
          )}
        </div>
        <div className={tableStyles.innerContainer}>
          <table className={tableStyles.table}>
            <thead>
              <tr className={tableStyles.titleRow}>
                {titleHeadings.map(({ title, classNames }, index) => {
                  const width =
                    index === 0 ? '' : `${100 / (titleHeadings.length - 1)}%`;
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
                  const aRank = a.selections?.leagueRank;
                  const bRank = b.selections?.leagueRank;
                  if (aRank > bRank) return 1;
                  return -1;
                })
                .map(bracket => {
                  const { name, id, selections } = bracket;
                  const totalPoints = selections?.totalPoints || 0;
                  const rank = selections?.leagueRank;
                  const numberOfWinners = selections?.numberOfWinners || 0;
                  return (
                    <tr
                      key={`row-${leagueData.id}-${name}`}
                      onClick={() =>
                        handleClick({ leagueId: leagueData.id, bracketId: id })
                      }
                    >
                      <td className={tableStyles.rank}>
                        <p className={tableStyles.number}>{rank}</p>
                      </td>
                      <td>
                        <p>{name}</p>
                      </td>
                      <td>
                        {totalPoints}/{numberOfWinners}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className={tableStyles.buttonsContainer}>
            {brackets.map(bracket => {
              const isCurrentUsersBracket = bracket.id === user.id;
              const buttonText = isCurrentUsersBracket
                ? 'Edit Bracket'
                : 'View Bracket';
              return (
                <div
                  className={tableStyles.buttonContainer}
                  key={`button-${bracket.id}-${bracket.name}`}
                >
                  <Button
                    classNames={clsx(
                      tableStyles.button,
                      isCurrentUsersBracket && tableStyles.pulse
                    )}
                    handleClick={() =>
                      handleClick({
                        leagueId: leagueData.id,
                        bracketId: bracket.id,
                      })
                    }
                    isSecondary={isCurrentUsersBracket}
                  >
                    {buttonText}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
