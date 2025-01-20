import { useState } from 'react';
import { editBracketName, getLeague } from '@/lib/firebase';
import LeagueTakeoverLayout from '@/components/shared/LeagueTakeoverLayout/LeagueTakeoverLayout';
import { updateRecord } from '@/lib/firebase-utils';
import { TABLES } from '@/utils/constants';

export default function EditBracketNameTakeover({ setShowTakeover, bracket }) {
  const [bracketName, setBracketName] = useState('');

  const handleSubmit = async () => {
    await editBracketName({
      id: bracket.id,
      bracketName,
    });
    const leagueId = bracket.leagueId[0];
    const league = await getLeague({
      id: leagueId,
    });
    const leagueJson = league?.json;
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
      tableId: TABLES.LEAGUES,
      recordId: leagueId,
      newFields: {
        json: updatedJson,
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
