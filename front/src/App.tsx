import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import LoginRegister from './components/loginRegister';
import UserHome from './components/home';
import DeleteUsers from './components/deleteUsers';
import HelloPage from './components/hello';

const App: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem('jwt') || '');

  const handleLogin = (newToken: string) => {
    localStorage.setItem('jwt', newToken);
    setToken(newToken);
  };

  return (
    <Router>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={token ? <UserHome /> : <LoginRegister onLogin={handleLogin} />} />
        <Route path="/delete" element={token ? <DeleteUsers /> : <Navigate to="/" />} />
        <Route path="/hello" element={token ? <HelloPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;