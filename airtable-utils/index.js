import { client } from 'graphql/apollo-config';
import {
  GET_USER_TEAM,
  UPDATE_USER_TEAM,
  GET_SNOWBOARDERS,
} from 'graphql/queries';

export const getSnowboarders = async () => {
  try {
    const { data, loading } = await client.query({
      query: GET_SNOWBOARDERS,
    });
    return { snowboarders: data.snowboarders, loading };
  } catch (error) {
    console.log(error);
  }
};

export const getUserTeam = async ({ name }) => {
  try {
    const { data, loading } = await client.query({
      query: GET_USER_TEAM,
      variables: { name },
    });
    return { userTeam: data.userTeams[0], loading };
  } catch (error) {
    console.log(error);
  }
};

export const updateUserTeam = async ({ round1Winners, round2Winners, id }) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_USER_TEAM,
      variables: { round1Winners, round2Winners, id },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
