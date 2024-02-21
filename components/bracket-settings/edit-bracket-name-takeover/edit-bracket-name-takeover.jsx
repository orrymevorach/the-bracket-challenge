import { useState } from 'react';
import { editBracketName, editLeagueName } from '@/lib/airtable';
import LeagueTakeoverLayout from '@/components/shared/league-takeover-layout/league-takeover-layout';
import { useRouter } from 'next/router';

export default function EditBracketNameTakeover({
  setShowTakeover,
  classNames = '',
  bracketId,
}) {
  const [bracketName, setBracketName] = useState('');
  const router = useRouter();

  const handleSubmit = async e => {
    const response = await editBracketName({
      id: bracketId,
      bracketName,
    });
    router.reload();
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
