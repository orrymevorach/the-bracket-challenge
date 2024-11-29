import { joinLeague } from '@/lib/airtable';
import { useUser } from 'context/user-context/user-context';
import { ROUTES } from '@/utils/constants';
import LeagueTakeoverLayout from '@/components/shared/league-takeover-layout/league-takeover-layout';
import { useState } from 'react';

export default function JoinLeagueTakeover({ setShowTakeover }) {
  const [leagueId, setLeagueId] = useState('');
  const user = useUser();

  const handleSubmit = async () => {
    const response = await joinLeague({
      leagueId,
      user,
    });
    window.location = `${ROUTES.DASHBOARD}`;
  };

  return (
    <LeagueTakeoverLayout
      setShowTakeover={setShowTakeover}
      handleSubmit={handleSubmit}
      title="Join Group"
      label="Enter the ID for the group you would like to join"
      buttonLabel="Join Group"
      inputValue={leagueId}
      setInputValue={setLeagueId}
    />
  );
}
