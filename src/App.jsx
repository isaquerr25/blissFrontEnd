import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Health from './page/health';
import Questions from './page/questions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Health />} />{' '}
        <Route path="/questions" element={<Questions />} />{' '}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
