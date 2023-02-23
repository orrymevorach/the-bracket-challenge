import { gql } from '@apollo/client';

export const GET_SNOWBOARDERS = gql`
  query GetSnowboarders {
    snowboarders {
      name
      id
      matchups
    }
  }
`;

export const GET_USER_TEAM = gql`
  query GetUserTeam($name: String) {
    userTeams(name: $name) {
      name
      round1Winners {
        name
        matchups
        id
      }
      round2Winners {
        name
        matchups
        id
      }
    }
  }
`;

export const UPDATE_USER_TEAM = gql`
  mutation UPDATE_USER_TEAM(
    $id: String
    $round1Winners: [String]
    $round2Winners: [String]
  ) {
    update_userTeams(
      id: $id
      round1Winners: $round1Winners
      round2Winners: $round2Winners
    ) {
      id
    }
  }
`;
