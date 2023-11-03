import { createBracket } from '@/lib/airtable';
import BracketChallenge from 'components/bracket-challenge/bracket-challenge';
import { useUser } from 'context/user-context/user-context';
import { useEffect } from 'react';

const useBracket = () => {
  const { userTeamData, authData, setUserTeamData } = useUser();
  useEffect(() => {
    const handleLoadBracket = async () => {
      if (userTeamData) {
        const { brackets } = userTeamData;
        if (brackets.length === 0) {
          const { userTeamData: updatedUserTeamData } = await createBracket({
            name: authData?.name,
            memberId: userTeamData.id,
          });
          setUserTeamData(updatedUserTeamData);
        }
      }
    };
    handleLoadBracket();
  }, [userTeamData, authData, setUserTeamData]);
};

export default function Bracket() {
  useBracket();
  return <BracketChallenge />;
}
