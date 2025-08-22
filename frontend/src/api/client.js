import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
});

client.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem('tokens') || 'null');
  if (tokens?.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

export default client;