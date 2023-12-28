import { useState } from 'react';
import { ROUTES } from '@/utils/constants';
import LeagueTakeoverLayout from '@/components/shared/league-takeover-layout/league-takeover-layout';
import { inviteMember } from '@/lib/mailgun';
import { useUser } from '@/context/user-context/user-context';

export default function InviteMemberTakeover({
  setShowTakeover,
  classNames = '',
  leagueId,
}) {
  const [memberEmail, setMemberEmail] = useState('');
  const user = useUser();
  const handleSubmit = async () => {
    const res = await inviteMember({
      email: memberEmail,
      leagueId,
      admin: user.name,
    });
    window.location = `${ROUTES.LEAGUE}/${leagueId}`;
  };

  return (
    <LeagueTakeoverLayout
      setShowTakeover={setShowTakeover}
      handleSubmit={handleSubmit}
      title="Invite Member"
      label="Email Address"
      buttonLabel="Invite"
      inputValue={memberEmail}
      setInputValue={setMemberEmail}
      classNames={classNames}
    />
  );
}
