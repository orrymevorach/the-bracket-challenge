import { useState } from 'react';
import styles from './CopyToClipboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export default function CopyToClipboard({ text, classNames = {} }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button onClick={handleCopy} className={clsx(styles.container, classNames)}>
      {text} <FontAwesomeIcon icon={faCopy} size="xs" className={styles.icon} />
      {copied && <span>Copied!</span>}
    </button>
  );
}
