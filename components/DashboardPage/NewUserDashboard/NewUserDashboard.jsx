import Wrapper from '@/components/shared/Wrapper/Wrapper';
import styles from './NewUserDashboard.module.scss';
import Button from '@/components/shared/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function NewUserDashboard({
  setShowJoinLeagueTakeover,
  setShowCreateLeagueTakeover,
}) {
  return (
    <Wrapper classNames={styles.container}>
      <div className={styles.textContainer}>
        {/* <p className={styles.paragraph}>
          Step 1: Join a group or create a group
        </p> */}
      </div>
      <div className={styles.tilesContainer}>
        <div className={styles.tile}>
          <p className={styles.title}>Join A Private League</p>
          <ul>
            <li>Join an existing League created by someone you know</li>
            <li>
              You must receive an invite from your League administrator in order
              to join
            </li>
          </ul>
          <FontAwesomeIcon
            icon={faPeopleGroup}
            color="white"
            size="3x"
            className={styles.icon}
          />
          <Button
            handleClick={() => setShowJoinLeagueTakeover(true)}
            // isLight
            classNames={styles.button}
          >
            Join A League
          </Button>
        </div>
        <div className={styles.tile}>
          <p className={styles.title}>Create A Private League</p>
          <ul>
            <li>Compete against your friends and family</li>
            <li>
              As the League administrator, only people that you invite to your
              League will have the ability to join
            </li>
          </ul>
          <FontAwesomeIcon
            icon={faPlus}
            color="white"
            size="3x"
            className={styles.icon}
          />
          <Button
            handleClick={() => setShowCreateLeagueTakeover(true)}
            // isLight
            classNames={styles.button}
          >
            Create A League
          </Button>
        </div>
        {/* <div className={styles.tile}>
          <p className={styles.title}>Join Our Public Group</p>
          <ul>
            <li>Automatically be entered to our public group</li>
            <li>Prove to the world that you are Taylor&apos;s #1 fan</li>
          </ul>
          <Button
            handleClick={() => setShowJoinLeagueTakeover(true)}
            isLight
            classNames={styles.button}
          >
            Join Group
          </Button>
        </div> */}
      </div>
    </Wrapper>
  );
}
