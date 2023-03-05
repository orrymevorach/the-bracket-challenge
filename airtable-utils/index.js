import { client } from 'graphql/apollo-config';
import { UPDATE_USER_TEAM, GET_SNOWBOARDERS } from 'graphql/queries';

export const getSnowboarders = async () => {
  try {
    const { data, loading } = await client.query({
      query: GET_SNOWBOARDERS,
    });
    return { snowboarders: data.snowboarders, isLoading: loading };
  } catch (error) {
    console.log(error);
  }
};

export const updateUserTeam = async ({
  roundOneWinners,
  quarterFinalWinners,
  semiFinalWinners,
  winner,
  id,
}) => {
  try {
    await client.mutate({
      mutation: UPDATE_USER_TEAM,
      variables: {
        roundOneWinners,
        quarterFinalWinners,
        semiFinalWinners,
        winner,
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
