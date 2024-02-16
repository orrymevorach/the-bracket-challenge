import { getLeagueMembers, joinLeague } from '@/lib/airtable';
import { useUser } from 'context/user-context/user-context';
import { ROUTES } from '@/utils/constants';
import LeagueTakeoverLayout from '@/components/shared/league-takeover-layout/league-takeover-layout';
import { useState } from 'react';

export default function JoinLeagueTakeover({ setShowTakeover }) {
  const [leagueId, setLeagueId] = useState('');
  const user = useUser();

  const handleSubmit = async () => {
    const existingMembers = await getLeagueMembers({ id: leagueId });
    const existingMemberIds = existingMembers.map(({ id }) => id);
    const memberRecordIds = [...existingMemberIds, user.id];

    const response = await joinLeague({
      id: leagueId,
      memberRecordIds,
    });
    console.log('response.id', response.id);
    // window.location = `${ROUTES.LEAGUE}/${response.id}`;
  };

  return (
    <LeagueTakeoverLayout
      setShowTakeover={setShowTakeover}
      handleSubmit={handleSubmit}
      title="Join League"
      label="Enter the ID for the league you would like to join"
      buttonLabel="Join League"
      inputValue={leagueId}
      setInputValue={setLeagueId}
    />
  );
}
