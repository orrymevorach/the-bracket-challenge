import { useState } from 'react';
import { createLeague } from '@/lib/airtable';
import { useUser } from 'context/user-context/user-context';
import { ROUTES } from '@/utils/constants';
import LeagueTakeoverLayout from '@/components/shared/LeagueTakeoverLayout/LeagueTakeoverLayout';

export default function CreateLeagueTakeover({ setShowTakeover }) {
  const [leagueName, setLeagueName] = useState('');
  const user = useUser();

  const handleSubmit = async e => {
    const response = await createLeague({
      name: leagueName,
      user,
    });
    window.location = `${ROUTES.DASHBOARD}`;
  };

  return (
    <LeagueTakeoverLayout
      setShowTakeover={setShowTakeover}
      handleSubmit={handleSubmit}
      title="Create League"
      label="Enter a name for your league"
      buttonLabel="Create League"
      inputValue={leagueName}
      setInputValue={setLeagueName}
    />
  );
}
