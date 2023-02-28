import { useState } from 'react';
import styles from './create-league.module.scss';
import { addLeagueId, createLeague } from 'airtable-utils/member-utils';
import { useUser } from 'context/user-context/user-context';
import Loader from 'components/loader/loader';
import { useRouter } from 'next/router';

export default function CreateLeague() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [leagueName, setLeagueName] = useState('');
  const {
    authData,
    airtableRecordData: { userAirtableRecordId },
  } = useUser();

  if (!authData || !userAirtableRecordId || isLoading) return <Loader />;

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    // Create the league in airtable, then set the record ID that airtable creates as the id so that we can use it later
    // The route to the dashboard
    createLeague({
      name: leagueName,
      leagueId: '1234',
      adminUid: authData.uid,
      adminAirtableRecordId: userAirtableRecordId,
    }).then(({ leagueRecordId }) => {
      addLeagueId({ leagueId: leagueRecordId, id: leagueRecordId }).then(() => {
        setIsLoading(false);
        router.push('/dashboard');
      });
    });
  };
  if (isLoading) return <Loader />;
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
