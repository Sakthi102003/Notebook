import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import AllProjectsPage from './pages/AllProjectsPage';
import CustomCursor from './components/ui/CustomCursor';
import LoadingScreen from './components/ui/LoadingScreen';
import CommandPalette from './components/features/CommandPalette';
import AudioProvider from './components/features/AudioProvider';
import IdCardOverlay from './components/features/IdCardOverlay';
import { DefconProvider } from './components/features/DefconProvider';
import { ThemeProvider } from './components/features/ThemeProvider';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <CustomCursor />
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <DefconProvider>
          <IdCardOverlay />
          <CommandPalette />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<AllProjectsPage />} />
          </Routes>
          <AudioProvider />
        </DefconProvider>
      )}
    </ThemeProvider>
  );
}

export default App;
