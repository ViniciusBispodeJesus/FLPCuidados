// src/services/authService.ts
import api from './api';
import { setToken, removeToken } from '../utils/storage';

type LoginPayload = { email: string; senha: string };

export async function login({ email, senha }: LoginPayload) {
  const resp = await api.post('/Auth/login', { email, senha });
  const { token, usuario } = resp.data; // ajuste ao schema do seu Swagger
  await setToken(token);
  return { token, usuario };
}

export async function logout() {
  await removeToken();
}
