import { useState } from 'react';
import { editBracketName, editLeagueName } from '@/lib/airtable';
import LeagueTakeoverLayout from '@/components/shared/league-takeover-layout/league-takeover-layout';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/constants';

export default function EditBracketNameTakeover({
  setShowTakeover,
  classNames = '',
  bracketId,
  leagueId,
}) {
  const [bracketName, setBracketName] = useState('');
  const router = useRouter();

  const handleSubmit = async e => {
    const response = await editBracketName({
      id: bracketId,
      bracketName,
    });
    router.push(
      `/${ROUTES.BRACKET_SETTINGS}/${bracketId}?leagueId=${leagueId}`
    );
  };

  return (
    <LeagueTakeoverLayout
      setShowTakeover={setShowTakeover}
      handleSubmit={handleSubmit}
      title="Edit Bracket Name"
      label="Enter a new name for your bracket"
      buttonLabel="Submit"
      inputValue={bracketName}
      setInputValue={setBracketName}
      classNames={classNames}
    />
  );
}
