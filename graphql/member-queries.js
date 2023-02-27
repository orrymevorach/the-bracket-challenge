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
  mutation CreateLeague($name: String, $leagueId: String, $adminUid: String) {
    insert_leagues(
      name: $name
      leagueId: $leagueId
      adminUid: $adminUid
      members: [$adminUid]
    ) {
      id
    }
  }
`;
