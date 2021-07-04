import { saveAndSendMetrics } from '../db';
import { fetchGithubData } from './github';
import { fetchWeatherData } from './weather';

import config from '../config';

export const startPolling = () => {
  setInterval(async () => {
    if (config.githubAccessToken && config.githubAccessTokenType) {
      const githubData = await fetchGithubData(
        config.githubAccessToken,
        config.githubAccessTokenType
      );
      saveAndSendMetrics(githubData, 'Github');

      const weatherData = await fetchWeatherData();
      saveAndSendMetrics(weatherData, 'Weather api');

      console.log('polled:\n', githubData, '\n', weatherData);
    }
  }, config.intervalTime * 1000);
};
