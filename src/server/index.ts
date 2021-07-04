import { client, insertMetrics } from './databox';
import { fetchWeatherData } from './apis/weather';
import express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import open from 'open';
import axios, { AxiosResponse } from 'axios';
import { fetchGithubData, getToken } from './apis/github';

dotenv.config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const state = process.env.STATE;

const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&login=&state=${state}`;

const authenticateGithub = async () => {
  await open(authUrl);
};

// authenticateGithub();

const app = express();

app.get<{ state: string; code: string }>(
  '/github-callback',
  async (req, res) => {
    const { state, code } = req.query;

    if (state !== state) {
      return res.redirect('/github-auth-error');
    }

    const { access_token, token_type } = await getToken(
      client_id,
      client_secret,
      code as string
    );
    
    const githubData = await fetchGithubData(access_token, token_type);
    const weatherData = await fetchWeatherData();

    insertMetrics(Object.assign({}, githubData, weatherData));

    res.redirect(`/`);
  }
);

const PORT = process.env.PORT || 2000;

app.use(express.static(path.resolve('build/client')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('build/client/index.html'));
});

app.listen(PORT, () => console.log('Server started on port', PORT));
