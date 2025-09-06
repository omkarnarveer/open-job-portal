import axios from 'axios';

// Set the base URL explicitly to the correct backend path
const client = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});

client.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem('tokens') || 'null');
  if (tokens?.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

export default client;