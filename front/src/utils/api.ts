import axios from 'axios';

const API_URL = 'http://localhost:3000/users'; // Replace with your backend URL

export const createUser = async (userData: { username: string; email: string; password: string; score: number }) => {
  return axios.post(`${API_URL}/create`, userData);
};

export const loginUser = async (credentials: { username?: string; email?: string; password: string }) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const getUserData = async (token: string) => {
  return axios.get(`${API_URL}/data`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUser = async (username: string, updateData: { score?: number; password?: string }, token: string) => {
  return axios.put(`${API_URL}/${username}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteAllUsers = async (token: string) => {
  return axios.delete(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};