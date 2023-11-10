import { useState } from 'react';
import styles from './create-league-takeover.module.scss';
import { createLeague } from '@/lib/airtable';
import { useUser } from 'context/user-context/user-context';
import Loader from 'components/shared/loader/loader';
import Button from '../shared/button/button';
import Input from '../shared/input/input';
import Takeover from '../shared/takeover/takeover';
import { ROUTES } from '@/utils/constants';

export default function CreateLeagueTakeover({ setShowTakeover }) {
  const [leagueName, setLeagueName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  if (isLoading) return <Loader />;

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const response = await createLeague({
      name: leagueName,
      memberRecordId: user.id,
    });
    setIsLoading(false);
    window.location = ROUTES.DASHBOARD;
  };

  return (
    <Takeover handleClose={() => setShowTakeover(false)}>
      <p>create league</p>
      <form action="#" onSubmit={e => handleSubmit(e)}>
        <Input
          label="League Name"
          handleChange={e => setLeagueName(e.target.value)}
          type="text"
          id="leagueName"
          name="leagueName"
          value={leagueName}
        />
        <Button>Create League</Button>
      </form>
    </Takeover>
  );
}
