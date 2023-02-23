export default function Player({ name, setWinner, id, round }) {
  const height = round * 50;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: `${height}px`,
      }}
    >
      <p style={{ width: '150px' }}>{name}</p>
      <button
        onClick={() => setWinner({ name, id })}
        style={{ marginLeft: '15px' }}
      >
        Select
      </button>
    </div>
  );
}
