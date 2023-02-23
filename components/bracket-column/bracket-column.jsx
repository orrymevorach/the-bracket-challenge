import Bracket from 'components/bracket';

export default function BracketColumn({ matchups, round }) {
  return (
    <div>
      {matchups
        .slice()
        .sort((a, b) => {
          if (a.id > b.id) return +1;
          return -1;
        })
        .map(({ id, snowboarders }) => (
          <Bracket key={id} snowboarders={snowboarders} round={round} id={id} />
        ))}
    </div>
  );
}
