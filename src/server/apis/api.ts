import { saveAndSendMetrics, db } from '../db';
import { fetchGithubData } from './github';
import { fetchWeatherData } from './weather';

import config from '../config';

export const startPolling = () => {
  setInterval(async () => {
    if (
      config.githubAccessToken &&
      config.githubAccessToken.length > 0 &&
      config.githubAccessTokenType &&
      config.githubAccessTokenType.length > 0
    ) {
      const githubData = await fetchGithubData(
        config.githubAccessToken,
        config.githubAccessTokenType
      );
      saveAndSendMetrics(githubData, 'Github', db);

      const weatherData = await fetchWeatherData();
      saveAndSendMetrics(weatherData, 'Weather api', db);
    }
  }, config.intervalTime * 1000);
};
