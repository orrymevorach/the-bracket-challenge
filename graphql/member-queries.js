import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($uid: String) {
    members(uid: $uid) {
      id
      leagues {
        id
        name
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($uid: String, $name: String) {
    insert_members(uid: $uid, name: $name) {
      id
      name
      leagues {
        id
        name
      }
    }
  }
`;

export const CREATE_LEAGUE = gql`
  mutation CreateLeague(
    $name: String
    $adminUid: String
    $adminAirtableRecordId: String
  ) {
    insert_leagues(
      name: $name
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

export const GET_LEAGUE = gql`
  query GetLeague($name: String) {
    leagues(name: $name) {
      members {
        uid
        name
      }
    }
  }
`;
