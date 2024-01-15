import Takeover from '@/components/shared/takeover/takeover';
import Image from 'next/image';
import styles from './player-modal.module.scss';

export default function PlayerModal({ player, setShowInfoModal }) {
  const { name, hometown, image, instagram, mountain, sponsors, stance, flag } =
    player;

  const instagramHandle = instagram
    ? instagram.replace('https://www.instagram.com/', '').replace('/', '')
    : '';

  const flagImage = flag && flag.length && flag[0];
  return (
    <Takeover
      handleClose={() => setShowInfoModal(false)}
      modalClassNames={styles.modal}
      closeButtonClassNames={styles.closeButton}
    >
      <div className={styles.topRow}>
        {image.length && (
          <Image
            src={image[0].url}
            width={image[0].width}
            height={image[0].height}
            alt=""
            className={styles.playerImage}
          />
        )}
        <div className={styles.textContainer}>
          <div className={styles.nameRow}>
            <Image
              src={flagImage.url}
              alt="hometown flag"
              className={styles.flag}
              width="50"
              height="50"
            />
            <p className={styles.name}>{name}</p>
          </div>
          <div>
            <a href={instagram}>@{instagramHandle}</a>
            <p>Hometown: {hometown}</p>
            <p>Mountain: {mountain}</p>
            <p>Stance: {stance}</p>
            <p>Sponsors: {sponsors}</p>
          </div>
        </div>
      </div>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo fuga,
        rerum debitis eveniet atque dignissimos voluptate. Sed non qui minus
        tenetur assumenda necessitatibus esse voluptatibus aliquam rerum,
        officiis, laborum expedita.
      </p>
    </Takeover>
  );
}
