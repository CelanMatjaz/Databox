import * as express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as open from 'open';

dotenv.config();

const clientId = process.env.CLIENT_ID;
const state = process.env.STATE;

const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&login=&state=${state}`;

const authenticateGithub = async () => {
  await open.default(authUrl);
};

authenticateGithub();

const app = express.default();

app.get<{ state: string }>('/github-callback', (req, res) => {
  if (req.params.state !== state) {
    res.redirect('/github-auth-error');
  }
  res.redirect('/');
});

app.use(express.static(path.resolve('build/client')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('build/client/index.html'));
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log('Server started on port', PORT));
