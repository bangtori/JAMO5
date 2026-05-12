import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WaitingPage from './pages/WaitingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/waiting" element={<WaitingPage />} />
        <Route path="/waiting/:token" element={<WaitingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
