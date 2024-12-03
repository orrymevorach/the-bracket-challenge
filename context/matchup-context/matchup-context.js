import { addWinnerToMatchups } from './matchup-utils';
import { useRouter } from 'next/router';
import useSetMatchups from './useSetMatchups';
import useGetApi from '@/hooks/useGetApi';
import { getBracket, getLeague } from '@/lib/airtable';

const { createContext, useContext, useState } = require('react');
const MatchupContext = createContext();

export const useMatchups = () => {
  return useContext(MatchupContext);
};

export const MatchupDataProvider = ({ children, contests }) => {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const currentContest = contests[currentRoundIndex];

  const router = useRouter();

  const bracketId = router.query.bracketId;
  const leagueId = router.query.leagueId;

  const { data: bracketData } = useGetApi(() =>
    getBracket({ recId: bracketId })
  );
  const { data: leagueData } = useGetApi(() => getLeague({ id: leagueId }));

  const json = leagueData?.json;
  const bracketsWithSelections = json ? JSON.parse(json) : [];
  const currentBracket = bracketsWithSelections.find(
    bracket => bracket.id === bracketId
  );
  if (bracketData) bracketData.selections = currentBracket?.selections;

  const setWinner = ({ player, matchupId, currentRound }) => {
    // const updatedRoundMatchups = addWinnerToMatchups({
    //   player,
    //   matchups: matchups[currentRound],
    //   matchupId,
    // });
    // // Making a copy so that state gets updated and creates a refresh
    // const matchupsCopy = { ...matchups };
    // matchupsCopy[currentRound] = updatedRoundMatchups;
    // setMatchups(matchupsCopy);
  };

  const value = {
    setWinner,
    contests,
    currentRoundIndex,
    setCurrentRoundIndex,
    currentContest,
    bracket: bracketData,
  };

  return (
    <MatchupContext.Provider value={value}>{children}</MatchupContext.Provider>
  );
};
