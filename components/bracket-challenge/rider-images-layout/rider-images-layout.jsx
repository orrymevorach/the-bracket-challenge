import Image from 'next/image';
import duelsRound1Men from 'public/longo-vs-backstrom.jpg';
import duelsRound2Men from 'public/mindnich-vs-daviet.jpeg';
import duelsRound3Men from 'public/gerard-vs-sweetin.jpeg';
import duelsRound1Women from 'public/anderson-vs-crosby.jpeg';
import styles from './rider-images-layout.module.scss';

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
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {images.left[currentRound].map(({ src }) => {
          return <RiderImage src={src} key={src.src} />;
        })}
      </div>
      {children}
      <div className={styles.right}>
        {images.right[currentRound].map(({ src }) => {
          return <RiderImage src={src} key={src.src} />;
        })}
      </div>
    </div>
  );
}
