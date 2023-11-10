import { MatchupDataProvider } from 'context/matchup-context/matchup-context';
import '../styles/globals.css';
import { UserProvider } from 'context/user-context/user-context';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      {/* <MatchupDataProvider> */}
      <Component {...pageProps} />
      {/* </MatchupDataProvider> */}
    </UserProvider>
  );
}
