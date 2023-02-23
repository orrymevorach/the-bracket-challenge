import Bracket from 'components/bracket';
import Loader from 'components/loader';

const sortRoundOne = (a, b) => {
  const aMatchupNumber = a.matchupId.split('R1_')[1];
  const bMatchupNumber = b.matchupId.split('R1_')[1];
  if (aMatchupNumber > bMatchupNumber) return 1;
  return -1;
};

const mapRoundToSortFunction = {
  1: sortRoundOne,
};
export default function BracketColumn({ matchups, round, isLoading }) {
  if (isLoading) return <Loader />;
  const sortFunction = mapRoundToSortFunction[round];
  return (
    <div>
      {matchups
        .slice()
        .sort(sortFunction)
        .map(({ matchupId, snowboarders }) => {
          return (
            <Bracket
              key={matchupId}
              snowboarders={snowboarders}
              round={round}
              matchupId={matchupId}
            />
          );
        })}
    </div>
  );
}
