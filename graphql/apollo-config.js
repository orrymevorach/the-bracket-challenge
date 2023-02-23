import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: `https://api.baseql.com/airtable/graphql/appwdHqFHAiJvNUpe`,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer NDI1MWYzZmEtZDM4ZC00NGY3LTliYzQtMTcyNWNiZTI3NTJm`,
  },
});
