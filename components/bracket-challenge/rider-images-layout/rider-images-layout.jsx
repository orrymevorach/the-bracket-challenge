import Image from 'next/image';
import duelsRound1Men from 'public/longo-vs-backstrom.jpg';
import duelsRound2Men from 'public/mindnich-vs-daviet.jpeg';
import duelsRound3Men from 'public/gerard-vs-sweetin.jpeg';
import duelsRound1Women from 'public/anderson-vs-crosby.jpeg';
import styles from './rider-images-layout.module.scss';
import { useWindowSize } from '@/context/window-size-context/window-size-context';

const images = {
  left: {
    Duels: [
      { src: duelsRound1Men },
      { src: duelsRound2Men },
      { src: duelsRound3Men },
    ],
    DuelsWomen: [{ src: duelsRound1Women }],
    Revelstoke: [],
    RevelstokeWomen: [],
    Selkirk: [],
    SelkirkWomen: [],
  },
  right: {
    Duels: [],
    DuelsWomen: [],
    Revelstoke: [],
    RevelstokeWomen: [],
    Selkirk: [],
    SelkirkWomen: [],
  },
};

const RiderImage = ({ src }) => {
  return (
    <div className={styles.imageContainer}>
      <Image src={src} alt="" className={styles.image} />
    </div>
  );
};
export default function RiderImagesLayout({ children, currentRound }) {
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.container}>
      {!isMobile && (
        <div className={styles.left}>
          {images.left[currentRound].map(({ src }) => {
            return <RiderImage src={src} key={src.src} />;
          })}
        </div>
      )}
      {children}
      {!isMobile && (
        <div className={styles.right}>
          {images.right[currentRound].map(({ src }) => {
            return <RiderImage src={src} key={src.src} />;
          })}
        </div>
      )}
    </div>
  );
}
