import styles from './Toggle.module.scss';
export default function Toggle({ sports, selectedToggle, handleChange }) {
  const handleToggle = value => {
    handleChange(value);
  };

  return (
    <form>
      {sports.map(option => {
        if (option.status !== 'Open') return;
        return (
          <div key={option.name} className={styles.toggleContainer}>
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
            <span className={styles.label}>{option.displayName}</span>
          </div>
        );
      })}
    </form>
  );
}
