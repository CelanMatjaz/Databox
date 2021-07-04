import { getToken, fetchGithubData } from './apis/github';
import { fetchWeatherData } from './apis/weather';
import { saveAndSendMetrics } from './db';
import * as dotenv from 'dotenv';

dotenv.config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export const handlers = {
  callbackUrl: async (req, res) => {
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

    saveAndSendMetrics(githubData, 'github');
    saveAndSendMetrics(weatherData, 'weather_api');

    res.redirect(`/`);
  },
};
