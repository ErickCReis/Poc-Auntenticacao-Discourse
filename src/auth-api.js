import axios from 'axios';
import { addLogInterceptor } from './utils.js';

const authApiClient = axios.create({
  baseURL: process.env.AUTH_API_URL,
});

addLogInterceptor(authApiClient, '[Auth API]');

export async function login(email, password) {
  const token = await authApiClient
    .post('/v1/login', { email, password, client_app: process.env.AUTH_API_CLIENT_APP })
    .then((res) => res.data.token);

  return authApiClient
    .get('/v1', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}
