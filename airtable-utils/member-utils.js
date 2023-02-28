import { client } from 'graphql/apollo-config';
import {
  ADD_LEAGUE_ID,
  CREATE_LEAGUE,
  CREATE_USER,
  GET_LEAGUE,
  GET_USER,
  JOIN_LEAGUE,
} from 'graphql/member-queries';

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

export const createUser = async ({ uid, name }) => {
  try {
    const { data, loading } = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        uid,
        name,
      },
    });
    return {
      userTeamData: data.insert_members[0],
    };
  } catch (error) {
    console.log(error);
  }
};

export const createLeague = async ({
  name,
  adminUid,
  adminAirtableRecordId,
}) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_LEAGUE,
      variables: {
        name,
        adminUid,
        adminAirtableRecordId,
      },
    });
    return {
      leagueRecordId: data.insert_leagues[0].id,
    };
  } catch (error) {
    console.log(error);
  }
};

export const addLeagueId = async ({ leagueId, id }) => {
  try {
    await client.mutate({
      mutation: ADD_LEAGUE_ID,
      variables: {
        leagueId,
        id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const joinLeague = async ({ id, memberRecordId }) => {
  try {
    await client.mutate({
      mutation: JOIN_LEAGUE,
      variables: {
        id,
        memberRecordId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getLeague = async ({ name }) => {
  try {
    const { data } = await client.query({
      query: GET_LEAGUE,
      variables: {
        name,
      },
    });
    return { league: data.leagues[0] };
  } catch (error) {
    console.log(error);
  }
};
