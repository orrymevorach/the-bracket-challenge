import Takeover from '@/components/shared/Takeover/Takeover';
import Image from 'next/image';
import styles from './player-modal.module.scss';

const MountainSVG = () => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    width="29"
    height="16"
    viewBox="0 0 29 16"
    fill="none"
  >
    <g clipPath="url(#clip0_86_160)">
      <path d="M0 16H15.8038L7.90191 4.68292L0 16Z" fill="#EEB7A5" />
      <path
        d="M29.0001 16H16.9892L11.8135 8.54634L17.8189 0L29.0001 16Z"
        fill="#EEB7A5"
      />
    </g>
    <defs>
      <clipPath id="clip0_86_160">
        <rect width="29" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const HomeSVG = () => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="21"
    viewBox="0 0 19 21"
    fill="none"
  >
    <g clipPath="url(#clip0_86_164)">
      <path
        d="M1.09929 20.9979H6.39716C7.00236 20.9979 7.49409 20.5072 7.49645 19.9032V14.6137C7.49645 14.4013 7.67139 14.2268 7.88416 14.2268H11.1182C11.331 14.2268 11.5059 14.4013 11.5059 14.6137V19.9032C11.5059 20.5072 12 20.9979 12.6052 20.9979H17.9031C18.5083 20.9979 19 20.5072 19 19.9032V6.87994C19 6.85399 18.9976 6.82804 18.9905 6.80208C18.9858 6.78085 18.9787 6.75962 18.9693 6.73838C18.9645 6.72423 18.9574 6.71007 18.948 6.69828C18.9433 6.68884 18.9362 6.6794 18.9291 6.66996C18.9243 6.66053 18.9173 6.65109 18.9078 6.64401C18.8983 6.63222 18.8865 6.62042 18.8723 6.61098C18.8676 6.60626 18.8629 6.60154 18.8582 6.59683L18.844 6.58739L10.4823 0.328205C9.90071 -0.108262 9.10166 -0.108262 8.52009 0.328205L0.156028 6.58975L0.141844 6.59919C0.141844 6.59919 0.132388 6.60862 0.12766 6.61334C0.113475 6.62278 0.101655 6.63457 0.0921986 6.64637C0.0851064 6.65345 0.0780142 6.66053 0.073286 6.66996C0.0614657 6.68176 0.0543735 6.69592 0.0472813 6.71007C0.0401891 6.71951 0.035461 6.72895 0.0330969 6.73838C0.0212766 6.75962 0.0141844 6.78085 0.00945626 6.80444C0.00236407 6.8304 0 6.85635 0 6.8823V19.9056C0 20.5095 0.49409 20.9979 1.09929 21.0003V20.9979Z"
        fill="#EEB7A5"
      />
    </g>
    <defs>
      <clipPath id="clip0_86_164">
        <rect width="19" height="21" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const SkiierSVG = () => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="27"
    viewBox="0 0 28 27"
    fill="none"
  >
    <g clipPath="url(#clip0_86_155)">
      <path
        d="M10.5896 5.90081C12.2391 5.72692 13.4467 4.2778 13.27 2.65478C13.0933 1.03177 11.6205 -0.156507 9.97102 0.0173872C8.32154 0.191282 7.11388 1.6404 7.29061 3.26342C7.46734 4.88643 8.9401 6.07471 10.5896 5.90081Z"
        fill="#EEB7A5"
      />
      <path
        d="M27.9378 24.8553C27.7316 24.3046 27.1425 23.9858 26.5534 24.1887L25.0512 24.6814C24.4327 24.8843 23.7846 24.9132 23.1661 24.7393L20.6035 24.0727L19.6904 17.4937C19.6315 17.059 19.3958 16.6822 19.0424 16.4504L15.9201 14.2767L14.4768 8.1904C19.1897 5.87181 20.0144 2.24901 20.0439 2.07511C20.1911 1.35055 19.7198 0.654977 18.9835 0.510065C18.2471 0.365153 17.5402 0.799889 17.3634 1.52445C17.334 1.66936 16.4798 5.08928 10.9422 6.65433C5.90541 8.07447 2.9599 13.2913 2.84208 13.5232C2.48862 14.1608 2.72426 15.0013 3.37227 15.349C3.57846 15.465 3.8141 15.5229 4.02029 15.5229C4.49157 15.5229 4.96285 15.2621 5.22794 14.8274C5.2574 14.7984 6.7007 12.2479 9.08656 10.538L9.88185 13.784L8.08509 14.4506C7.43708 14.6825 7.0247 15.3201 7.05416 16.0156L7.40762 20.5949L4.55048 19.8413C3.93192 19.6674 3.37227 19.3486 2.9599 18.8559L1.89952 17.6966C1.5166 17.2619 0.809683 17.2039 0.367857 17.6097C-0.0739695 17.9864 -0.13288 18.682 0.279491 19.1168L1.33987 20.2761C2.0468 21.0586 2.9599 21.6092 3.99083 21.8991L22.6064 26.8261C23.0777 26.942 23.549 27 24.0203 27C24.6094 27 25.1985 26.913 25.7581 26.7101L27.2603 26.2174C27.82 26.0146 28.144 25.4059 27.9378 24.8553ZM10.2942 16.9431L12.7684 16.0446C12.8274 16.0156 12.8863 15.9867 12.9452 15.9577L16.7154 18.5661L17.334 23.2033L10.6477 21.4354L10.2942 16.9431Z"
        fill="#EEB7A5"
      />
    </g>
    <defs>
      <clipPath id="clip0_86_155">
        <rect width="28" height="27" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const InfoIconContainer = ({ Svg, label, value }) => {
  return (
    <div>
      <div className={styles.row}>
        <Svg />
        <div>
          <p className={styles.title}>{label}</p>
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default function PlayerModal({ player, setShowInfoModal }) {
  const {
    name,
    hometown,
    image,
    instagram,
    mountain,
    sponsors,
    stance,
    flag,
    description,
  } = player;

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
            <div className={styles.nameContainer}>
              <p className={styles.name}>{name}</p>
              <a className={styles.instagram} href={instagram}>
                @{instagramHandle}
              </a>
            </div>
          </div>
          <div>
            <InfoIconContainer
              Svg={() => <HomeSVG />}
              label="Hometown"
              value={hometown}
            />
            <div className={styles.bottomRow}>
              <InfoIconContainer
                Svg={() => <SkiierSVG />}
                label="Stance"
                value={stance}
              />
              <InfoIconContainer
                Svg={() => <MountainSVG />}
                label="Mountain"
                value={mountain}
              />
            </div>
          </div>
        </div>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.sponsors}>
        <p className={styles.title}>Sponsors</p>
        <p>{sponsors}</p>
      </div>
    </Takeover>
  );
}
