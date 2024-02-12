import SubmissionForm from '../submission-form/submission-form';
import useVendorSubmissionForm from './useSubmissionForm';
import { sendVendorSubmissionForm } from 'lib/mailgun';
import { useState } from 'react';
import styles from './form.module.scss';

export default function ArtistSubmissionForm() {
  const useFormReducer = useVendorSubmissionForm();
  const { state, dispatch, actions, stages } = useFormReducer;
  const [isLoading, setIsLoading] = useState(false);
  const { stage } = state;

  const handleSubmit = async () => {
    setIsLoading(true);
    const fields = {
      Name: state.name,
      'Email Address': state.email,
      Message: state.message,
    };

    await sendVendorSubmissionForm({ fields });
    dispatch({ type: actions.SET_STAGE, stage: stages.CONFIRMATION });
    setIsLoading(false);
  };

  const formConfig = [
    {
      type: 'text',
      label: 'Your name',
      id: 'name',
      value: state.name,
      handleChange: value => dispatch({ type: actions.SET_NAME, name: value }),
      required: true,
    },
    {
      type: 'text',
      label: 'Email',
      id: 'email',
      value: state.email,
      handleChange: value =>
        dispatch({ type: actions.SET_EMAIL, email: value }),
      required: true,
    },
    {
      type: 'textarea',
      label: 'Your message',
      id: 'message',
      value: state.message,
      handleChange: value =>
        dispatch({ type: actions.SET_MESSAGE, message: value }),
      required: true,
    },
  ];

  return (
    <>
      {stage === stages.FILL_OUT_FORM && (
        <SubmissionForm
          formConfig={formConfig}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          formContainerClassNames={styles.formContainer}
          inputClassNames={styles.input}
          labelClassNames={styles.label}
          inputContainerClassNames={styles.inputContainer}
          buttonClassNames={styles.button}
          requiredPosition="bottom"
        />
      )}
      {stage === stages.CONFIRMATION && (
        <div>
          <h2 className={styles.thankYouHeading}>
            Thank you for your submission!
          </h2>
          <p className={styles.thankYouText}>We will be in touch shortly.</p>
        </div>
      )}
    </>
  );
}
