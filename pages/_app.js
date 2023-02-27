import { MatchupDataProvider } from 'context/matchup-context/matchup-context';
import '../styles/globals.css';
import { UserProvider } from 'context/user-context/user-context';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <MatchupDataProvider>
        <Component {...pageProps} />
      </MatchupDataProvider>
    </UserProvider>
  );
}
