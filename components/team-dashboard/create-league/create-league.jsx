import { useState } from 'react';
import styles from './create-league.module.scss';
import { addLeagueId, createLeague } from 'airtable-utils';
import { useUser } from 'context/user-context/user-context';
import Loader from 'components/loader/loader';
import { getUid } from 'utils/utils';
import { useRouter } from 'next/router';

export default function CreateLeague() {
  const router = useRouter();
  const [leagueName, setLeagueName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { userTeamData, isUserTeamDataLoading, setUserTeamData } = useUser();
  const uid = getUid();
  if (isLoading || isUserTeamDataLoading) return <Loader />;

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    // Create the league in airtable, then set the record ID that airtable creates as the id so that we can use it later
    // The route to the dashboard
    const { leagueRecordId, userTeamData: updatedUserTeamData } =
      await createLeague({
        name: leagueName,
        adminUid: uid,
        adminAirtableRecordId: userTeamData.id,
      });
    await addLeagueId({ leagueId: leagueRecordId, id: leagueRecordId });
    setIsLoading(false);
    setUserTeamData(updatedUserTeamData);
    router.push('/dashboard');
  };

  return (
    <div>
      <h1>create league</h1>

      <form action="#" onSubmit={e => handleSubmit(e)}>
        <label htmlFor="leagueName">League Name</label>
        <input
          type="text"
          id="leagueName"
          name="leagueName"
          value={leagueName}
          onChange={e => setLeagueName(e.target.value)}
        />
        <button type="submit">Create League</button>
      </form>
    </div>
  );
}
