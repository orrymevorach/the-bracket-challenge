import {
  addUpdatedBracketSelectionsToMatchups,
  mapMatchupsAndSnowboardersToContestData,
} from './matchup-utils';
import { useRouter } from 'next/router';
import useGetApi from '@/hooks/useGetApi';
import { getBracket, getMatchupsBySport } from '@/lib/airtable';
import { updateRecord } from '@/lib/airtable-utils';

const { createContext, useContext, useState, useEffect } = require('react');
const MatchupContext = createContext();

export const useMatchups = () => {
  return useContext(MatchupContext);
};

export const MatchupDataProvider = ({
  children,
  contests: initialContestsData,
  snowboarders,
}) => {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [contests, setContests] = useState(initialContestsData);
  const currentContest = contests[currentRoundIndex];
  const [bracket, setBracket] = useState(null);
  const router = useRouter();

  // Get bracket data
  const bracketId = router.query.bracketId;
  const { data: bracketData } = useGetApi(() =>
    getBracket({ recId: bracketId })
  );

  const sport = currentContest.sport[0];
  const { data: matchups } = useGetApi(() =>
    getMatchupsBySport({
      sport,
    })
  );

  // On page load, add saved bracket selections to matchups
  useEffect(() => {
    if (bracketData && !bracket?.selections && matchups) {
      const bracketSelections = bracketData?.selections
        ? JSON.parse(bracketData.selections)
        : [];

      const contestsWithData = mapMatchupsAndSnowboardersToContestData(
        contests,
        snowboarders,
        matchups
      );

      const contestsWithBracketSelections =
        addUpdatedBracketSelectionsToMatchups(
          bracketSelections,
          contestsWithData,
          snowboarders
        );
      setBracket({
        ...bracketData,
        selections: bracketSelections,
      });
      setContests(contestsWithBracketSelections);
    }
  }, [bracket, bracketData, matchups]);

  const setWinner = async ({ player, matchupId }) => {
    let bracketSelections = bracket?.selections;

    // If user has no previous selections, create an array of objects with the name and subBracket data for each contest in this sport
    // This happens if the user is making selections for the first time
    if (!bracketSelections) {
      bracketSelections = Array.from(contests).map(contest => ({
        name: contest.name,
        subBracket: contest.subBracket,
      }));
    }

    // Get existing selections of current contest
    let bracketSelectionsInCurrentContest =
      bracketSelections[currentRoundIndex];

    // If there are not existing selections of current contest, add contest details to object
    if (!bracketSelectionsInCurrentContest) {
      bracketSelectionsInCurrentContest = {
        name: contests[currentRoundIndex].name,
        subBracket: contests[currentRoundIndex].subBracket,
      };
    }

    // Add the new selection to current contest
    const currentContestSelectionsWithWinner = {
      ...bracketSelectionsInCurrentContest,
      [matchupId]: player,
    };

    // Add the current contest with the latest selection to the bracket selections
    bracketSelections[currentRoundIndex] = currentContestSelectionsWithWinner;

    // Update the airtable record with the new selections
    await updateRecord({
      tableId: 'User Brackets',
      recordId: bracketId,
      newFields: {
        Selections: JSON.stringify(bracketSelections),
      },
    });

    // Get the updated matchups with the new selection
    const contestsWithUpdatedMatchups = addUpdatedBracketSelectionsToMatchups(
      bracketSelections,
      contests,
      snowboarders
    );

    // Set both the updated contest and bracket data with the latest selections
    setBracket({
      ...bracketData,
      selections: bracketSelections,
    });
    setContests(contestsWithUpdatedMatchups);
  };
  const value = {
    setWinner,
    contests,
    currentRoundIndex,
    setCurrentRoundIndex,
    currentContest,
    bracket,
    snowboarders,
  };

  return (
    <MatchupContext.Provider value={value}>{children}</MatchupContext.Provider>
  );
};
