import styles from './input.module.scss';
import { TextField } from '@mui/material';
import clsx from 'clsx';

export default function Input({
  label = '',
  type,
  id,
  value,
  error,
  classNames,
  handleChange,
  labelClassNames = '',
  placeholder = '',
  required = false,
}) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={clsx(styles.label, labelClassNames)}>
        {label}
      </label>
      {error && <p className={styles.error}>{error}</p>}
      <TextField
        type={type}
        id={id}
        name={id}
        onChange={handleChange}
        value={value}
        className={clsx(styles.input, classNames)}
        size="small"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
