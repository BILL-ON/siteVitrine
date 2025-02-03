import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  };

  return (
    <nav>
      <button onClick={() => navigate('/delete')}>Wipe All Users</button>
      <button onClick={() => navigate('/hello')}>Hello</button>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={handleLogout}>Disconnect</button>
    </nav>
  );
};

export default Navbar;