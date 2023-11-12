import { useState } from 'react';
import { ROUTES } from '@/utils/constants';
import LeagueTakeoverLayout from '@/components/shared/league-takeover-layout/league-takeover-layout';

export default function InviteMemberTakeover({
  setShowTakeover,
  classNames = '',
  leagueId,
}) {
  const [membersName, setMemberName] = useState('');

  const handleSubmit = async () => {
    // Send invite email to new user
    window.location = `${ROUTES.LEAGUE}/${leagueId}`;
  };

  return (
    <LeagueTakeoverLayout
      setShowTakeover={setShowTakeover}
      handleSubmit={handleSubmit}
      title="Invite Member"
      label="Email Address"
      buttonLabel="Invite"
      inputValue={membersName}
      setInputValue={setMemberName}
      classNames={classNames}
    />
  );
}
