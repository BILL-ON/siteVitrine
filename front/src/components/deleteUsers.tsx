import React from 'react';
import { deleteAllUsers } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const DeleteUsers: React.FC = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      await deleteAllUsers(token);
      alert('Suppression successful');
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Wipe All Users?</h1>
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
        Wipe All
      </button>
    </div>
  );
};

export default DeleteUsers;