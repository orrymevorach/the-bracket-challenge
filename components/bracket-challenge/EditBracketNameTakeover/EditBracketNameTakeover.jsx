import { useState } from 'react';
import { editBracketName, getLeague } from '@/lib/firebase';
import LeagueTakeoverLayout from '@/components/shared/LeagueTakeoverLayout/LeagueTakeoverLayout';
import { updateRecord } from '@/lib/firebase-utils';
import { TABLES } from '@/utils/constants';
import { getSport } from '@/lib/airtable';

export default function EditBracketNameTakeover({
  setShowTakeover,
  bracket,
  sport,
}) {
  const [bracketName, setBracketName] = useState('');

  const handleSubmit = async () => {
    await editBracketName({
      id: bracket.id,
      bracketName,
    });
    const leagueId = bracket.leagueId;
    const league = await getLeague({
      id: leagueId,
    });
    const leagueJson = league?.json || [];
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

    try {
      const sportData = await getSport({
        sport: sport[0],
      });
      const openLeagueId = sportData.openLeagueId[0];

      const openLeagueData = await getLeague({ id: openLeagueId });
      const openLeagueJson = openLeagueData.json || [];
      const updatedOpenLeagueJson = openLeagueJson.map(currentBracket => {
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
        recordId: openLeagueId,
        newFields: {
          json: updatedOpenLeagueJson,
        },
      });
    } catch (err) {
      console.error('Error updating open league bracket name', err);
    }

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
