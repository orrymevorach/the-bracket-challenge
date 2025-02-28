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
    const bracket = await joinLeague({
      leagueId: leagueId.trim(),
      user,
    });

    if (bracket.error) {
      setErrorMessage(bracket.error);
      return;
    }
    window.location = `${ROUTES.BRACKET_CHALLENGE}/${bracket.sport}?leagueId=${leagueId}&bracketId=${bracket.id}`;
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
