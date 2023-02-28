import { joinLeague } from 'airtable-utils/member-utils';
import Loader from 'components/loader/loader';
import { useUser } from 'context/user-context/user-context';
import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from './join-league.module.scss';

export default function JoinLeague() {
  const [leagueId, setLeagueId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    authData,
    airtableRecordData: { userAirtableRecordId },
  } = useUser();

  if (!authData || !userAirtableRecordId || isLoading) return <Loader />;

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    joinLeague({ id: leagueId, memberRecordId: userAirtableRecordId }).then(
      () => router.push('/dashboard')
    );
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
