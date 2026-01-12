import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import AllProjectsPage from './pages/AllProjectsPage';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import CommandPalette from './components/CommandPalette';
import AudioProvider from './components/AudioProvider';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <CommandPalette />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<AllProjectsPage />} />
          </Routes>
          <AudioProvider />
        </>
      )}
    </>
  );
}

export default App;
