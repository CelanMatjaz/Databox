import { getToken, fetchGithubData } from './apis/github';
import { fetchWeatherData } from './apis/weather';
import { saveAndSendMetrics, getData } from './db';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export const handlers = {
  callbackUrlHandler: async (req: Request, res: Response) => {
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

    saveAndSendMetrics(githubData, 'Github');
    saveAndSendMetrics(weatherData, 'Weather api');

    res.redirect(`/`);
  },
  getDataHandler: (req: Request, res: Response) => {
    res.send(getData());
  },
};
