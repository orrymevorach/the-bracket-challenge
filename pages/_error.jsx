import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';

const YourCustomErrorComponent = props => {
  return <Error statusCode={props.statusCode} />;
};

YourCustomErrorComponent.getInitialProps = async contextData => {
  await Sentry.captureUnderscoreErrorException(contextData);

  // ...other getInitialProps code

  return Error.getInitialProps(contextData);
};

export default YourCustomErrorComponent;
