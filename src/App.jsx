import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Health from './page/health';
import Questions from './page/questions';
import Question from './page/question';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Health />} />{' '}
        <Route path="/questions" element={<Questions />} />{' '}
        <Route path="/questions/:id" element={<Question />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
