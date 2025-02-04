import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import SignUp from '../components/register';
import UserHome from '../components/home';
import DeleteUsers from '../components/deleteUsers';
import HelloPage from '../components/hello';
import Login from '../components/login';

const App: React.FC = () => {
  const token = localStorage.getItem('jwt');

  return (
    <Router>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={token ? <UserHome /> : <Navigate to="/register" />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/delete" element={token ? <DeleteUsers /> : <Navigate to="/register" />} />
        <Route path="/hello" element={token ? <HelloPage /> : <Navigate to="/register" />} />
      </Routes>
    </Router>
  );
};

export default App;