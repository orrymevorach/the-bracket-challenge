import { useState } from 'react';
import { editBracketName, getLeague } from '@/lib/airtable';
import LeagueTakeoverLayout from '@/components/shared/LeagueTakeoverLayout/LeagueTakeoverLayout';
import { updateRecord } from '@/lib/airtable-utils';

export default function EditBracketNameTakeover({ setShowTakeover, bracket }) {
  const [bracketName, setBracketName] = useState('');

  const handleSubmit = async e => {
    await editBracketName({
      id: bracket.id,
      bracketName,
    });
    const leagueId = bracket.leagueId[0];
    const league = await getLeague({ id: leagueId });
    const leagueJson = league.json ? JSON.parse(league.json) : {};
    const updatedJson = leagueJson.map(currentBracket => {
      if (currentBracket.id === bracket.id) {
        return {
          ...currentBracket,
          bracketName,
        };
      }
      return currentBracket;
    });
    await updateRecord({
      tableId: 'Leagues',
      recordId: leagueId,
      newFields: {
        json: JSON.stringify(updatedJson),
      },
    });
    window.location.reload();
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
    />
  );
}
