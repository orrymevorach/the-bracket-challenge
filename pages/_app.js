import { MatchupDataProvider } from 'context/matchup-context/matchup-context';
import '../styles/globals.css';
import { UserProvider } from 'context/user-context/user-context';
import { AuthProvider } from 'context/user-context/auth-context';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserProvider>
        <MatchupDataProvider>
          <Component {...pageProps} />
        </MatchupDataProvider>
      </UserProvider>
    </AuthProvider>
  );
}
