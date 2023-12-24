import {
  GET_FEATURE_FLAG,
  GET_IS_PAGE_PUBLISHED,
} from '@/graphql/contentful/queries';
import { client } from '@/graphql/contentful/apollo-config';

export const getFeatureFlag = async ({ name }) => {
  const { data } = await client.query({
    query: GET_FEATURE_FLAG,
    variables: {
      name,
    },
    fetchPolicy: 'no-cache',
  });
  return data.featureFlagCollection.items[0].value;
};

const getIsPagePublished = async ({ url }) => {
  const { data } = await client.query({
    query: GET_IS_PAGE_PUBLISHED,
    variables: {
      url,
    },
    fetchPolicy: 'no-cache',
  });
  const isPagePublished =
    data?.pageCollection?.items && data?.pageCollection?.items.length > 0;

  const isPasswordProtected =
    isPagePublished && data?.pageCollection?.items[0].passwordProtection;
  return { isPagePublished, isPasswordProtected };
};

export const getPageLoadData = async ({ url }) => {
  const { isPagePublished, isPasswordProtected } = await getIsPagePublished({
    url,
  });

  return {
    isPagePublished,
    isPasswordProtected,
  };
};
