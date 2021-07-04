import { getToken, fetchGithubData } from './apis/github';
import { fetchWeatherData } from './apis/weather';
import { saveAndSendMetrics, getData } from './db';
import { Request, Response } from 'express';

import config from './config'

export const handlers = {
  callbackUrlHandler: async (req: Request, res: Response) => {
    const { state, code } = req.query;

    if (state !== state) {
      return res.redirect('/github-auth-error');
    }

    const { access_token, token_type } = await getToken(
      config.clientId,
      config.clientSecret,
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
