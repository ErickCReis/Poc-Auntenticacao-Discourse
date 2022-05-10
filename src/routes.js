import path from 'node:path';
import express from 'express';

import { generateToken, getUser, postTopic, sso_login, sso_sync } from './discourse.js';
import { login } from './auth-api.js';

export const routes = express.Router();

routes.get('/login', function (_, res) {
  res.sendFile(path.join(process.env.PWD, 'public', 'login.html'));
});

routes.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  const user = await login(email, password);

  const query = new URLSearchParams(req.headers.referer.split('?')[1]);
  const result = sso_login({ sso: query.get('sso'), sig: query.get('sig'), user });

  res.redirect(result);
});

routes.post('/post', async (req, res) => {
  const { userId, topic } = req.body;
  let user = await getUser(userId);
  if (!user) {
    // Buscar dados do usuário no auth-api interna, utilizando apenas o id do usuário
    const userData = {
      id: userId,
      username: `user${userId}`,
      email: `${userId}@test.com`,
    };
    user = await sso_sync(userData);
  }

  const token = await generateToken(user.username);
  const result = await postTopic({ token, username: user.username, topic });

  // Deletar ou salvar token do cache

  return res.json(result);
});
