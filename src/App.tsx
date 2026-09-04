import { Routes, Route } from 'react-router-dom';
import { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/ui/CustomCursor';
import LoadingScreen from './components/ui/LoadingScreen';
import UnlockIntroScreen from './components/ui/UnlockIntroScreen';
import AudioProvider from './components/features/AudioProvider';
import { ThemeProvider } from './components/features/ThemeProvider';

const Home = lazy(() => import('./pages/Home'));

function RouteFallback() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white font-mono text-xs uppercase tracking-widest">
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
        <span>Loading interface...</span>
      </div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState<'unlock' | 'loading' | 'app'>('unlock');

  return (
    <ThemeProvider>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {screen === 'unlock' && (
          <UnlockIntroScreen key="unlock-screen" onUnlock={() => setScreen('loading')} />
        )}

        {screen === 'loading' && (
          <LoadingScreen key="loading-screen" onLoadingComplete={() => setScreen('app')} />
        )}
      </AnimatePresence>

      {screen === 'app' && (
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
          <AudioProvider />
        </Suspense>
      )}
    </ThemeProvider>
  );
}

export default App;
