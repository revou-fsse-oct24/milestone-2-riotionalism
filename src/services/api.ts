import axios from 'axios';

const API_URL = 'https://api.placzi.com';

export const login = (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const register = (email: string, password: string) => {
  return axios.post(`${API_URL}/register`, { email, password });
};