import styles from './Tile.module.scss';
import Button from '@/components/shared/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function breakSentenceIntoLines(sentence) {
  const words = sentence.split(' ');

  // Group words into chunks of two
  const lines = [];
  for (let i = 0; i < words.length; i += 2) {
    lines.push(words.slice(i, i + 2).join(' '));
  }

  return lines.map((line, index) => <div key={index}>{line}</div>);
}

export default function Tile({
  title,
  description,
  icon,
  button,
  handleClick,
  color,
  index,
}) {
  const formattedTitle = breakSentenceIntoLines(title);
  return (
    <div
      className={styles.tile}
      style={{ '--delay': `${index * 0.5}s` }} // Pass delay as a CSS variable
    >
      <p className={styles.title} style={{ color: color }}>
        {formattedTitle}
      </p>
      <ul>
        {description.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <FontAwesomeIcon
        icon={icon}
        color="white"
        size="3x"
        className={styles.icon}
      />
      <Button handleClick={handleClick} classNames={styles.button}>
        {button}
      </Button>
    </div>
  );
}
