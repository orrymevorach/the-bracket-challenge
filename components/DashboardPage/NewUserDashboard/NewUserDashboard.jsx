import Wrapper from '@/components/shared/Wrapper/Wrapper';
import styles from './NewUserDashboard.module.scss';
import {
  faGlobe,
  faPeopleGroup,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Tile from './Tile/Tile';
import { COLORS } from '@/utils/constants';

const getTileData = ({
  setShowJoinLeagueTakeover,
  setShowCreateLeagueTakeover,
}) => [
  {
    title: 'Join A Private League',
    description: [
      'Join an existing league created by someone you know',
      'You must receive an invite from your league administrator in order to join',
      'Your bracket selections will automatically be entered into our public league, where you will compete for real prizes',
    ],
    icon: faPeopleGroup,
    button: 'Join A League',
    handleClick: () => setShowJoinLeagueTakeover(true),
    color: '#f37475',
  },
  {
    title: 'Create A Private League',
    description: [
      'Compete against your friends and family',
      'As the league administrator, only people that you invite to your league will have the ability to join',
      'Your bracket selections will automatically be entered into our public league, where you will compete for real prizes',
    ],
    icon: faPlus,
    button: 'Create A League',
    handleClick: () => setShowCreateLeagueTakeover(true),
    color: COLORS.GREEN,
  },
  {
    title: 'Join Our Public Group',
    description: [
      'Join "The Open", our public group where you can create a bracket and compete against all participants of "The Bracket Challenge"',
      'Winners of "The Open" are awarded real prizes from our sponsors',
    ],
    icon: faGlobe,
    button: 'Join Group',
    handleClick: () => setShowJoinLeagueTakeover(true),
    color: '#65b2e3',
  },
];

export default function NewUserDashboard({
  setShowJoinLeagueTakeover,
  setShowCreateLeagueTakeover,
}) {
  const tileData = getTileData({
    setShowJoinLeagueTakeover,
    setShowCreateLeagueTakeover,
  });

  return (
    <Wrapper classNames={styles.container}>
      <div className={styles.textContainer}></div>
      <div className={styles.tilesContainer}>
        {tileData.map((tile, index) => {
          return <Tile key={tile.title} {...tile} index={index} />;
        })}
      </div>
    </Wrapper>
  );
}
