import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Test Route - Works!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;