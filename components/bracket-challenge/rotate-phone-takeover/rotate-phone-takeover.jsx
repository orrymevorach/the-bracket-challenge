import Takeover from '@/components/shared/takeover/takeover';
import styles from './rotate-phone-takeover.module.scss';
import { useEffect, useState } from 'react';

export default function RotatePhoneTakeover() {
  const [showTakeover, setShowTakeover] = useState(true);
  useEffect(() => {
    const handleScreenOrientation = () => {
      const screenOrientation = window?.screen?.orientation?.type;
      if (
        window &&
        window.screen &&
        window.screen.orientation &&
        window.screen.orientation.type
      ) {
        if (screenOrientation.includes('portrait')) {
          setShowTakeover(true);
        } else if (screenOrientation.includes('landscape')) {
          setShowTakeover(false);
        }
      }
    };

    handleScreenOrientation();
  }, []);
  return (
    <>
      {showTakeover ? (
        <Takeover
          handleClose={() => setShowTakeover(false)}
          showTakeover={showTakeover}
        >
          <div className={styles.overlay}>
            <div className={styles.iconContainer}>
              <div className={styles.phone}></div>
              <p>Rotate your device for the best experience!</p>
            </div>
          </div>
        </Takeover>
      ) : (
        ''
      )}
    </>
  );
}
