import Loader from 'components/loader/loader';
import { useUser } from 'context/user-context/user-context';

export default function Teams() {
  const { userTeamData, isUserTeamDataLoading } = useUser();
  const { leagues } = userTeamData;

  if (isUserTeamDataLoading) return <Loader />;
  return (
    <div>
      <h3>Leagues</h3>
      {leagues.map(({ name }) => {
        return (
          <div key={name}>
            <p> {name}</p>
          </div>
        );
      })}
    </div>
  );
}
