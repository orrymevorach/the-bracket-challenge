import '../styles/globals.css';
import { useState } from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import PageNotFound from './404';
import PasswordProtectionTakeover from '@/components/shared/PasswordProtectionTakeover/PasswordProtectionTakeover';
import GoogleAnalytics from '@/components/shared/google-analytics/google-analytics';
import { WindowSizeProvider } from '@/context/window-size-context/window-size-context';
import Loader from '@/components/shared/Loader/Loader';
import useRouteChange from '@/hooks/useRouteChange';
import Image from 'next/image';
config.autoAddCss = false;
import logo from '@/public/logo-center-white.png';

export default function App({ Component, pageProps }) {
  const { isPagePublished, isPasswordProtected } = pageProps;
  const [showPasswordProtectionTakeover, setShowPasswordProtectionTakeover] =
    useState(true);
  const isRouteChanging = useRouteChange();

  if (isRouteChanging) return <Loader isBrackets isFullPage />;
  return (
    <div
      style={{
        backgroundColor: '#191919',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        padding: '0 20px',
      }}
    >
      <Image src={logo} alt="logo" style={{ width: '300px' }} />
      <div
        style={{
          marginTop: '50px',
          color: 'white',
          textAlign: 'center',
          fontSize: '20px',
        }}
      >
        <p style={{ marginBottom: '10px' }}>
          The Bracket Challenge is currently down while we make updates.
        </p>
        <p>Please check back in 48 hours.</p>
      </div>
    </div>
  );

  if (isPagePublished === false) return <PageNotFound />;
  if (isPasswordProtected && showPasswordProtectionTakeover)
    return (
      <PasswordProtectionTakeover
        setShowPasswordProtectionTakeover={setShowPasswordProtectionTakeover}
      />
    );
  return (
    <>
      <GoogleAnalytics />
      <WindowSizeProvider>
        <Component {...pageProps} />
      </WindowSizeProvider>
    </>
  );
}
