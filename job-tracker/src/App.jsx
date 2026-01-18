import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Resume from './pages/Resume';
import Jobs from './pages/Jobs';
import { getCurrentUser } from './services/auth';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />

        <Route path="/resume" element={
          <PrivateRoute>
            <Resume />
          </PrivateRoute>
        } />

        <Route path="/jobs" element={
          <PrivateRoute>
            <Jobs />
          </PrivateRoute>
        } />

        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
