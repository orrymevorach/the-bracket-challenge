import {
  GET_FEATURE_FLAG,
  GET_IS_PAGE_PUBLISHED,
} from '@/graphql/contentful/queries';
import { client } from '@/graphql/contentful/apollo-config';
import { getEntryByField } from './contentful-utils';
import { CONTENT_MODELS } from '@/utils/constants';

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

async function getVideoDuration(video) {
  const ffprobe = require('ffprobe');
  const ffprobeStatic = require('ffprobe-static');

  const videoUrl = `https:${video.fields.file.url}`;

  // // Use ffprobe to fetch video metadata
  let duration = null;

  try {
    const metadata = await ffprobe(videoUrl, { path: ffprobeStatic.path });
    duration = metadata.streams[0].duration; // Duration in seconds
    return parseFloat(duration);
  } catch (error) {
    console.error('Error fetching video metadata:', error);
  }
}

export async function getMedia() {
  const media = await getEntryByField({
    contentTypeId: CONTENT_MODELS.LIST_MEDIA,
    fieldName: 'title',
    fieldValue: 'HOME_PAGE',
  });

  const items = await Promise.all(
    media.media.map(async item => {
      const video = item.fields.video;
      if (!video) {
        return {
          createdAt: item.sys.createdAt,
          ...item.fields,
        };
      }

      const duration = await getVideoDuration(video);

      return {
        ...item.fields,
        createdAt: item.sys.createdAt,
        duration: parseFloat(duration),
      };
    })
  );

  return {
    ...media,
    items,
  };
}
