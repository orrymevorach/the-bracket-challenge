import { ROUTES } from '@/utils/constants';
import tableStyles from '@/components/shared/Table/Table.module.scss';
import { useRouter } from 'next/router';
import Button from '@/components/shared/Button/Button';
import { useUser } from '@/context/user-context/user-context';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import InviteMemberTakeover from '@/components/DashboardPage/InviteMemberTakeover/InviteMemberTakeover';
import { useState } from 'react';
import { isEmpty } from '@/utils/utils';

export default function LeagueRankingsTable({ leagueData, contests }) {
  const router = useRouter();
  const user = useUser();
  const [showInviteMemberTakeover, setShowInviteMemberTakeover] =
    useState(false);

  const currentContest = contests?.find(
    ({ sport }) => leagueData.sport === sport
  );

  const brackets = leagueData.json;
  const leagueAdmin = leagueData?.admin && leagueData.admin[0];
  const isAdmin = leagueAdmin && user.id === leagueAdmin;

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
          <p className={tableStyles.title}>
            {leagueData.name}{' '}
            <span
              style={{
                color: currentContest?.color,
                WebkitTextStroke: currentContest?.textStrokeColor
                  ? `1px ${currentContest?.textStrokeColor}`
                  : '',
              }}
            >
              {leagueData.sport}
            </span>
          </p>
          {isAdmin && (
            <div className={tableStyles.topRowButtonsContainer}>
              <Button
                isSmall
                classNames={tableStyles.inviteButton}
                handleClick={() =>
                  router.push({
                    pathname: ROUTES.LEAGUE,
                    query: {
                      leagueId: leagueData.id,
                    },
                  })
                }
              >
                View League <FontAwesomeIcon icon={faBarsStaggered} />
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
                  const { name, username, selections } = bracket;
                  const totalPoints = selections?.totalPoints || 0;
                  const rank = selections?.leagueRank;
                  const numberOfWinners = selections?.numberOfWinners || 0;
                  return (
                    <tr key={`row-${leagueData.id}-${name}`}>
                      <td className={tableStyles.rank}>
                        <p
                          className={tableStyles.number}
                          style={{
                            backgroundColor: currentContest?.color,
                          }}
                        >
                          {rank}
                        </p>
                      </td>
                      <td>
                        <p>{username}</p>
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
              const hasSelections = !isEmpty(bracket.selections);
              const buttonText = hasSelections
                ? 'Edit Bracket'
                : 'Create Bracket';
              return (
                <div
                  className={tableStyles.buttonContainer}
                  key={`button-${bracket.id}-${bracket.name}`}
                >
                  {isCurrentUsersBracket && (
                    <Button
                      classNames={clsx(
                        tableStyles.button,
                        !hasSelections && tableStyles.pulse
                      )}
                      style={{
                        backgroundColor: currentContest?.color,
                        border: `1px solid ${currentContest?.color}`,
                      }}
                      handleClick={() =>
                        router.push({
                          pathname: ROUTES.BRACKET,
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
