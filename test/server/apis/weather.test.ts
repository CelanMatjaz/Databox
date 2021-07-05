import { fetchWeatherData } from './../../../src/server/apis/weather';
import dotenv from 'dotenv';
import { expect } from 'chai';

dotenv.config();

import config, { Config } from '../../../src/server/config';

describe('weather api', () => {
  describe('fetchWeatherData', () => {
    it('should fetch weather data from the api', async () => {
      const data = await fetchWeatherData(config);
      expect(data).to.not.be.null;
    });

    it('should return all the required fields for metrics', async () => {
      const data = await fetchWeatherData(config);
      const { pressure, humidity, visibility, temperature, wind_speed } = data;

      expect(pressure).to.not.be.undefined;
      expect(humidity).to.not.be.undefined;
      expect(visibility).to.not.be.undefined;
      expect(temperature).to.not.be.undefined;
      expect(wind_speed).to.not.be.undefined;
    });

    it('should throw an error', async () => {
      try {
        expect(await fetchWeatherData({} as Config)).to.throw;
      } catch {}
    });
  });
});
