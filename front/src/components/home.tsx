import React, { useEffect, useState } from 'react';
import { getUserData } from '../utils/api';
import ModifyUserForm from './modifyUserForm';

const UserHome: React.FC = () => {
  const [userData, setUserData] = useState<{ username: string; score: number } | null>(null);
  const [showModifyForm, setShowModifyForm] = useState(false);

  const fetchUserData = async () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const response = await getUserData(token);
      setUserData(response.data);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {userData.username}!</h1>
      <p>Your score: {userData.score}</p>
      <button onClick={() => setShowModifyForm(!showModifyForm)}>
        {showModifyForm ? 'Hide Form' : 'Modify Your Data'}
      </button>
      {showModifyForm && (
        <ModifyUserForm username={userData.username} onUpdate={fetchUserData} />
      )}
    </div>
  );
};

export default UserHome;