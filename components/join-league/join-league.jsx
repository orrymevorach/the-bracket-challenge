import { joinLeague } from '@/lib/airtable';
import Loader from 'components/shared/loader/loader';
import { useUser } from 'context/user-context/user-context';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './join-league.module.scss';

export default function JoinLeague() {
  const router = useRouter();
  const [leagueId, setLeagueId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { userTeamData, isUserTeamDataLoading, setUserTeamData } = useUser();

  if (isLoading || isUserTeamDataLoading) return <Loader />;

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const { userTeamData: updatedUserTeamData } = await joinLeague({
      id: leagueId,
      memberRecordId: userTeamData.id,
    });
    setIsLoading(false);
    setUserTeamData(updatedUserTeamData);
    router.push('/dashboard');
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
