import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($uid: String) {
    members(uid: $uid) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($uid: String) {
    insert_members(uid: $uid) {
      id
    }
  }
`;

export const CREATE_LEAGUE = gql`
  mutation CreateLeague(
    $name: String
    $leagueId: String
    $adminUid: String
    $adminAirtableRecordId: String
  ) {
    insert_leagues(
      name: $name
      leagueId: $leagueId
      adminUid: $adminUid
      members: [$adminAirtableRecordId]
    ) {
      id
    }
  }
`;

export const ADD_LEAGUE_ID = gql`
  mutation AddLeagueId($leagueId: String, $id: String) {
    update_leagues(id: $id, leagueId: $leagueId) {
      id
    }
  }
`;

export const JOIN_LEAGUE = gql`
  mutation AddLeagueId($id: String, $memberRecordId: String) {
    update_leagues(id: $id, members: [$memberRecordId]) {
      id
    }
  }
`;
