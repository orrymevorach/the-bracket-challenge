import { useEffect, useState } from 'react';
import styles from './ProgressBar.module.scss';

export default function ProgressBar({ isActive, duration }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;

    if (isActive) {
      setProgress(0); // Reset progress when activated
      const durationInMs = duration * 1000; // Convert seconds to milliseconds
      const interval = 50; // Interval in milliseconds
      const step = (interval / durationInMs) * 100; // Percentage to increase per interval

      timer = setInterval(() => {
        setProgress(prev => {
          const nextProgress = prev + step;
          if (nextProgress >= 100) {
            clearInterval(timer);
            return 100; // Ensure progress stays at 100 when done
          }
          return nextProgress;
        });
      }, interval);
    } else {
      setProgress(0); // Reset progress if deactivated
    }

    return () => clearInterval(timer); // Clean up timer on unmount or reactivation
  }, [isActive, duration]); // Add `duration` as a dependency

  return (
    <div className={styles.progressBar}>
      <div
        style={{ width: `${progress}%` }}
        className={`${styles.filler} ${isActive ? styles.active : ''}`}
      ></div>
    </div>
  );
}
