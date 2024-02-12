import Button from '@/components/shared/button/button';
import GetFormElement from './formElements';
import styles from './submission-form.module.scss';
import clsx from 'clsx';

export default function SubmissionForm({
  formConfig,
  handleSubmit = () => {},
  isLoading = false,
  formContainerClassNames = '',
  inputClassNames = '',
  labelClassNames = '',
  inputContainerClassNames = '',
  buttonClassNames = '',
  requiredPosition = 'top',
}) {
  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form
      action="#"
      className={clsx(styles.container, formContainerClassNames)}
      onSubmit={handleSubmitForm}
    >
      {requiredPosition === 'top' && (
        <p className={styles.requiredText}>
          Fields marked with an <span className={styles.asterisk}>*</span> are
          required
        </p>
      )}

      {formConfig.map((elementConfig, index) => {
        return (
          <GetFormElement
            key={`${index}-submission-form`}
            {...elementConfig}
            inputClassNames={inputClassNames}
            labelClassNames={labelClassNames}
            inputContainerClassNames={inputContainerClassNames}
          />
        );
      })}
      {requiredPosition === 'bottom' && (
        <p className={styles.requiredText}>
          Fields marked with an <span className={styles.asterisk}>*</span> are
          required
        </p>
      )}

      <Button classNames={clsx(styles.submitButton)} isLoading={isLoading}>
        Submit
      </Button>
    </form>
  );
}
