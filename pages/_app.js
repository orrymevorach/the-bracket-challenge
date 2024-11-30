import '../styles/globals.css';
import { useState } from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import PageNotFound from './404';
import PasswordProtectionTakeover from '@/components/shared/PasswordProtectionTakeover/PasswordProtectionTakeover';
import GoogleAnalytics from '@/components/shared/google-analytics/google-analytics';
import { ConfigProvider } from '@/context/config-context/config-context';
import { WindowSizeProvider } from '@/context/window-size-context/window-size-context';
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const { isPagePublished, isPasswordProtected } = pageProps;
  const [showPasswordProtectionTakeover, setShowPasswordProtectionTakeover] =
    useState(true);

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
        <ConfigProvider>
          <Component {...pageProps} />
        </ConfigProvider>
      </WindowSizeProvider>
    </>
  );
}
