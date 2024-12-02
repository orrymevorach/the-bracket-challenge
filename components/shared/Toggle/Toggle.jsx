import styles from './Toggle.module.scss';
export default function Toggle({ sports, selectedToggle, handleChange }) {
  const handleToggle = value => {
    handleChange(value);
  };

  return (
    <form>
      {sports.map(option => (
        <div key={option.name} className={styles.toggleContainer}>
          {/* Toggle Switch */}
          <div
            onClick={() => handleToggle(option.name)}
            className={styles.switchContainer}
            style={{
              backgroundColor:
                selectedToggle === option.name ? option.color : '#ccc',
            }}
          >
            <div
              className={styles.switchKnob}
              style={{
                left: selectedToggle === option.name ? '25px' : '2.5px',
              }}
            />
          </div>

          {/* Label */}
          <span className={styles.label}>{option.name}</span>
        </div>
      ))}
    </form>
  );
}
