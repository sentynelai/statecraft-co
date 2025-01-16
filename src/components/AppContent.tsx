import React from 'react';
import { LoginScreen } from './LoginScreen';
import { PreloadScreen } from './PreloadScreen';
import { Dashboard } from './Dashboard';
import { useAppState } from '../hooks/useAppState';
import { useProvincialData } from '../hooks/useStoreData';

export function AppContent() {
  const { isLoggedIn, showPreload, setLoggedIn, setShowPreload } = useAppState();
  const { setUseDemoData } = useProvincialData();

  const handleLogin = () => {
    setLoggedIn(true);
    setShowPreload(true);
  };

  const handleDemoConsent = (useDemo: boolean) => {
    setUseDemoData(false);
    setShowPreload(false);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (showPreload) {
    return <PreloadScreen onDemoConsent={handleDemoConsent} />;
  }

  return <Dashboard />;
}