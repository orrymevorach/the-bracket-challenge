import { useState } from 'react';
import { editLeagueName } from '@/lib/airtable';
import { ROUTES } from '@/utils/constants';
import LeagueTakeoverLayout from '@/components/shared/league-takeover-layout/league-takeover-layout';

export default function EditLeagueNameTakeover({
  setShowTakeover,
  classNames = '',
  leagueId,
}) {
  const [leagueName, setLeagueName] = useState('');

  const handleSubmit = async e => {
    const response = await editLeagueName({
      id: leagueId,
      leagueName,
    });
    window.location = `${ROUTES.LEAGUE_SETTINGS}/${leagueId}`;
  };

  return (
    <LeagueTakeoverLayout
      setShowTakeover={setShowTakeover}
      handleSubmit={handleSubmit}
      title="Edit League Name"
      label="Enter a new name for your league"
      buttonLabel="Submit"
      inputValue={leagueName}
      setInputValue={setLeagueName}
      classNames={classNames}
    />
  );
}
