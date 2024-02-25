import Image from 'next/image';
import duelsRound1Men from 'public/matchups/backstrom-vs-debuck.jpeg';
import duelsRound2Men from 'public/matchups/mindnich-vs-daviet.jpeg';
import duelsRound3Men from 'public/matchups/gerard-vs-sweetin.jpeg';
import duelsRound4Men from 'public/matchups/torgier-vs-raibu.jpeg';
import duelsRound1Women from 'public/matchups/anderson-vs-crosby.jpeg';
import duelsRound2Women from 'public/matchups/rand-vs-obrien.jpeg';
import styles from './rider-images-layout.module.scss';
import { useWindowSize } from '@/context/window-size-context/window-size-context';

const images = {
  left: {
    Duels: [
      { src: duelsRound1Men },
      { src: duelsRound2Men },
      { src: duelsRound3Men },
      { src: duelsRound4Men },
    ],
    DuelsWomen: [{ src: duelsRound1Women }, { src: duelsRound2Women }],
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
