import { joinLeague } from 'airtable-utils/member-utils';
import Loader from 'components/loader/loader';
import { useUser } from 'context/user-context/user-context';
import { useState } from 'react';
import styles from './join-league.module.scss';

export default function JoinLeague() {
  const [leagueId, setLeagueId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { userTeamData, isUserTeamDataLoading } = useUser();

  if (isLoading || isUserTeamDataLoading) return <Loader />;

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    await joinLeague({ id: leagueId, memberRecordId: userTeamData.id });
    window.location = '/dashboard';
  };

  return (
    <div>
      <form action="#" onSubmit={e => handleSubmit(e)}>
        <label htmlFor="leagueId">League ID</label>
        <input
          type="text"
          id="leagueId"
          name="leagueId"
          value={leagueId}
          onChange={e => setLeagueId(e.target.value)}
        />
        <button type="submit">Join League</button>
      </form>
    </div>
  );
}
