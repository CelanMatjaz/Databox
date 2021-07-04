import { startPolling } from './apis/api';
import { handlers } from './handlers';
import express from 'express';
import * as path from 'path';
import open from 'open';

import config from './config';

const app = express();

const client_id = config.clientId;
const state = config.state;

export const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&login=&state=${state}`;

const authenticateGithub = async () => {
  await open(authUrl);
};

authenticateGithub();
startPolling();

app.get<{ state: string; code: string }>(
  '/github-callback',
  handlers.callbackUrlHandler
);

const PORT = process.env.PORT || 2000;

app.get('/data', handlers.getDataHandler);
app.use(express.static(path.resolve('build/client')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('build/client/index.html'));
});

app.listen(PORT, () => console.log('Server started on port', PORT));
