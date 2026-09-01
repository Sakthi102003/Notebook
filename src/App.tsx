import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import AllProjectsPage from './pages/AllProjectsPage';
import CustomCursor from './components/ui/CustomCursor';
import LoadingScreen from './components/ui/LoadingScreen';
import UnlockIntroScreen from './components/ui/UnlockIntroScreen';
import AudioProvider from './components/features/AudioProvider';
import { ThemeProvider } from './components/features/ThemeProvider';

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
        <>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<AllProjectsPage />} />
          </Routes>
          <AudioProvider />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
