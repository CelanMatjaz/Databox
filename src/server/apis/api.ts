import { saveAndSendMetrics, db } from '../db';
import { fetchGithubData } from './github';
import { fetchWeatherData } from './weather';

import { Config } from '../config';

export const startPolling = (config: Config) => {
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

      const weatherData = await fetchWeatherData(config);
      saveAndSendMetrics(weatherData, 'Weather api', db);
    }
  }, config.intervalTime * 1000);
};
