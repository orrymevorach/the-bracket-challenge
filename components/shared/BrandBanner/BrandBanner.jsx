import Image from 'next/image';
import styles from './BrandBanner.module.scss';
import { getEntryByField, getMedia } from '@/lib/contentful-utils';
import useGetApi from '@/hooks/useGetApi';
import { CONTENT_MODELS } from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';

async function getBrandLogos({ fieldValue }) {
  const logos = await getEntryByField({
    contentTypeId: CONTENT_MODELS.LIST_MEDIA,
    fieldName: 'title',
    fieldValue: fieldValue,
  });
  return logos?.media;
}

export default function BrandBanner({ isNav, isBlack = false }) {
  const fieldValue = isBlack ? 'BRAND_LOGOS_BLACK' : 'BRAND_LOGOS';
  const { data: brandLogos } = useGetApi(() => getBrandLogos({ fieldValue }));
  if (!brandLogos?.length) return <div />;
  return (
    <div className={clsx(styles.container, isNav && styles.isNav)}>
      {brandLogos.map(({ fields }) => {
        const { src, alt, height, width } = getMedia(fields.image);
        if (fields.link) {
          return (
            <Link key={src} className={styles.logoContainer} href={fields.link}>
              <Image src={src} width={width} height={height} alt={alt} />
            </Link>
          );
        }
        return (
          <div key={src} className={styles.logoContainer}>
            <Image src={src} width={width} height={height} alt={alt} />
          </div>
        );
      })}
    </div>
  );
}
