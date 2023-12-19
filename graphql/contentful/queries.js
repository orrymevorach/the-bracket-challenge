import { gql } from '@apollo/client';

export const GET_FEATURE_FLAG = gql`
  query getFeatureFlag($name: String) {
    featureFlagCollection(where: { name: $name }) {
      items {
        name
        value
      }
    }
  }
`;

export const GET_IS_PAGE_PUBLISHED = gql`
  query GetIsPagePublished($slug: String) {
    pageCollection(where: { slug: $slug }) {
      items {
        label
        passwordProtection
      }
    }
  }
`;
