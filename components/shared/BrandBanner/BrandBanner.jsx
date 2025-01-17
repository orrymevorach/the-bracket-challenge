import Image from 'next/image';
import styles from './BrandBanner.module.scss';
import { getEntryByField, getMedia } from '@/lib/contentful-utils';
import useGetApi from '@/hooks/useGetApi';
import { CONTENT_MODELS } from '@/utils/constants';

async function getBrandLogos() {
  const logos = await getEntryByField({
    contentTypeId: CONTENT_MODELS.LIST_MEDIA,
    fieldName: 'title',
    fieldValue: 'BRAND_LOGOS',
  });
  return logos.media;
}

export default function BrandBanner() {
  const { data: brandLogos } = useGetApi(getBrandLogos);
  if (!brandLogos?.length) return;
  return (
    <div className={styles.container}>
      {brandLogos.map(({ fields }) => {
        const { src, alt, height, width } = getMedia(fields.image);
        return (
          <div key={src} className={styles.logoContainer}>
            <Image src={src} width={width} height={height} alt={alt} />
          </div>
        );
      })}
    </div>
  );
}
