import React, { useState } from 'react';
import { updateUser } from '../utils/api';

interface ModifyUserFormProps {
  username: string;
  onUpdate: () => void; // Callback to refresh user data after update
}

const ModifyUserForm: React.FC<ModifyUserFormProps> = ({ username, onUpdate }) => {
  const [score, setScore] = useState<number | ''>('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('jwt');
    if (!token) {
      setMessage('You must be logged in to update your data.');
      return;
    }

    try {
      const updateData: { score?: number; password?: string } = {};
      if (score !== '') updateData.score = score;
      if (password) updateData.password = password;

      await updateUser(username, updateData, token);
      setMessage('Update successful!');
      onUpdate(); // Refresh user data
    } catch (error) {
      setMessage('Failed to update user data.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Modify Your Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Score:</label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value === '' ? '' : Number(e.target.value))}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ModifyUserForm;