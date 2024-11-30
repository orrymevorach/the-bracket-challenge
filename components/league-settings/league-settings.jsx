import styles from './league-settings.module.scss';
import LeaguePageLayout from '../LeaguePage/league-page-layout/league-page-layout';
import { useLeagueConfig } from '@/context/league-config-context/league-config-context';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../shared/Button/Button';
import EditLeagueNameTakeover from './edit-league-name-takeover/edit-league-name-takeover';
import { getLeagueMembers } from '@/lib/airtable';
import InviteMemberTakeover from './invite-member-takeover/invite-member-takeover';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';

export default function LeagueSettings() {
  // const [isLoading, setIsLoading] = useState(false);
  const { name, id } = useLeagueConfig({ getMembers: true });

  const [showEditLeagueNameTakeover, setShowEditLeagueNameTakeover] =
    useState(false);
  const [showInviteMemberTakeover, setShowInviteMemberTakeover] =
    useState(false);

  const [members, setMembers] = useState([]);
  useEffect(() => {
    const getMembersData = async () => {
      const membersData = await getLeagueMembers({ id });
      setMembers(membersData || []);
    };
    if (id && !members.length) {
      getMembersData();
    }
  }, [id, members]);

  return (
    <LeaguePageLayout title="League Settings:">
      <div>
        {showEditLeagueNameTakeover && (
          <EditLeagueNameTakeover
            setShowTakeover={setShowEditLeagueNameTakeover}
            classNames={styles.editLeagueNameTakeover}
            leagueId={id}
          />
        )}
        {showInviteMemberTakeover && (
          <InviteMemberTakeover
            setShowTakeover={setShowInviteMemberTakeover}
            leagueId={id}
          />
        )}
        <div className={styles.container}>
          <p className={styles.title}>League Name </p>
          <Button
            isSmall
            handleClick={() => setShowEditLeagueNameTakeover(true)}
            classNames={styles.editButton}
            isYellow
          >
            <FontAwesomeIcon icon={faEdit} color="white" />
          </Button>
        </div>
        <p className={styles.leagueName}>{name}</p>
        <div className={styles.container}>
          <p className={styles.title}>League Members</p>
          <Button
            isSmall
            classNames={styles.button}
            handleClick={() => setShowInviteMemberTakeover(true)}
            isYellow
          >
            <p className={styles.addMemberText}>Invite Member</p>
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </Button>
        </div>
        {members.map(({ name }, index) => (
          <p key={name} className={styles.name}>
            {index + 1}. {name}
          </p>
        ))}
      </div>
    </LeaguePageLayout>
  );
}
