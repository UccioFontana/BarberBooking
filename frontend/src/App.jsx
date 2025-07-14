import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // sposta il contenuto attuale qui
import BarberDetails from './BarberDetails'; // nuova pagina
import './index.css';
import LogPage from './LogPage';
import Dashboard from './Dashboard';
import ProtRoute from './ProtRoute';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barbers/:id" element={<BarberDetails />} />
        <Route path="/admin" element={<LogPage />} />
        <Route path="/admin/dashboard" element={<ProtRoute><Dashboard/></ProtRoute>}/> 
      </Routes>
    </Router>
  );
}

export default App;