import { client } from 'graphql/apollo-config';
import { CREATE_LEAGUE, CREATE_USER, GET_USER } from 'graphql/member-queries';

export const getUser = async ({ uid }) => {
  try {
    const { data } = await client.query({
      query: GET_USER,
      variables: {
        uid,
      },
    });
    return { userTeamData: data.members[0] };
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async ({ uid }) => {
  try {
    const { data, loading } = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        uid,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createLeague = async ({ name, leagueId, adminUid }) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_LEAGUE,
      variables: {
        name,
        leagueId,
        adminUid,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
