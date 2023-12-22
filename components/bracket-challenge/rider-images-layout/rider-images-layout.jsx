import Image from 'next/image';
import round1 from 'public/longo-vs-backstrom.jpg';
import round2 from 'public/mindnich-vs-daviet.jpeg';
import round3 from 'public/gerard-vs-sweetin.jpeg';
import styles from './rider-images-layout.module.scss';

const leftImages = [{ src: round1 }, { src: round2 }, { src: round3 }];
const rightImages = [];

const RiderImage = ({ src }) => {
  return (
    <div className={styles.imageContainer}>
      <Image src={src} alt="" className={styles.image} />
    </div>
  );
};
export default function RiderImagesLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {leftImages.map(({ src }) => {
          return <RiderImage src={src} key={src.src} />;
        })}
      </div>
      {children}
      <div className={styles.right}>
        {rightImages.map(({ src }) => {
          return <RiderImage src={src} key={src.src} />;
        })}
      </div>
    </div>
  );
}
