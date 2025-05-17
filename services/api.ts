import axios from 'axios';
import { getToken } from '../utils/storage';

const api = axios.create({
  baseURL: 'https://flpcuidadosapi.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para injetar o token em toda requisição
api.interceptors.request.use(async config => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
/* // src/services/api.ts
import axios from 'axios';
import { getToken } from '../../utils/storage';

const api = axios.create({
  baseURL: 'https://flpcuidadosapi.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para injetar o token em toda requisição
api.interceptors.request.use(async config => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api; */