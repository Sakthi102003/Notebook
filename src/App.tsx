import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import AllProjectsPage from './pages/AllProjectsPage';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';

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
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<AllProjectsPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
