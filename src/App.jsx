import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Questions from './page/questions';
import Question from './page/question';
import Health from './page/health';
import NoInternet from './page/noInternetWarning';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleNetworkChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);
  return isOnline ? (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Health />} />{' '}
        <Route path="/questions" element={<Questions />} />{' '}
        <Route path="/questions/:id" element={<Question />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <NoInternet />
  );
}

export default App;
