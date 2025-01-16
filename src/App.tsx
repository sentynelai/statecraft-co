import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppContent } from './components/AppContent';

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}