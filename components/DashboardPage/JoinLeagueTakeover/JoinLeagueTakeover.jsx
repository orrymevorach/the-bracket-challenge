import { joinLeague } from '@/lib/firebase';
import { useUser } from 'context/user-context/user-context';
import { ROUTES } from '@/utils/constants';
import LeagueTakeoverLayout from '@/components/shared/LeagueTakeoverLayout/LeagueTakeoverLayout';
import { useState } from 'react';

export default function JoinLeagueTakeover({ setShowTakeover }) {
  const [leagueId, setLeagueId] = useState('');
  const user = useUser();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    const { error } = await joinLeague({
      leagueId,
      user,
    });
    if (error) {
      setErrorMessage(error);
      return;
    }
    window.location = `${ROUTES.DASHBOARD}`;
  };

  const handleChange = value => {
    setErrorMessage('');
    setLeagueId(value);
  };

  return (
    <LeagueTakeoverLayout
      setShowTakeover={setShowTakeover}
      handleSubmit={handleSubmit}
      title="Join League"
      label="Enter the ID for the league you would like to join"
      buttonLabel="Join League"
      inputValue={leagueId}
      setInputValue={handleChange}
      error={errorMessage}
    />
  );
}
