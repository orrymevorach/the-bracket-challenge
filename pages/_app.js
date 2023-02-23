import { MatchupDataProvider } from 'context/matchup-context/matchup-context';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <MatchupDataProvider>
      <Component {...pageProps} />
    </MatchupDataProvider>
  );
}
