import Image from 'next/image';
import styles from './BrandBanner.module.scss';
import { getMedia } from '@/lib/contentful-utils';

export default function BrandBanner({ brandLogos }) {
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
