import { gql } from '@apollo/client';

export const GET_SNOWBOARDERS = gql`
  query GetSnowboarders {
    snowboarders {
      name
      id
      matchupId
    }
  }
`;

export const GET_USER_TEAM = gql`
  query GetUserTeam($name: String) {
    userTeams(name: $name) {
      name
      round1Winners {
        name
        matchupId
        id
      }
      round2Winners {
        name
        matchupId
        id
      }
      round3Winners {
        name
        matchupId
        id
      }
      round4Winners {
        name
        matchupId
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
    $round3Winners: [String]
    $round4Winners: [String]
  ) {
    update_userTeams(
      id: $id
      round1Winners: $round1Winners
      round2Winners: $round2Winners
      round3Winners: $round3Winners
      round4Winners: $round4Winners
    ) {
      id
    }
  }
`;
