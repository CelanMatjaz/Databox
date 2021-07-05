import { weatherMetrics } from '../../common/types/metrics';
import axios, { AxiosResponse } from 'axios';

import { Config } from '../config';

const city = 'maribor';

export const fetchWeatherData = async (
  config: Config
): Promise<weatherMetrics> => {
  const res = await axios.get<
    {},
    AxiosResponse<{
      main: { temp: number; pressure: number; humidity: number };
      visibility: number;
      wind: { speed: number };
    }>
  >(`http://api.openweathermap.org/data/2.5/weather`, {
    params: { q: city, appid: config.weatherApiKey, units: 'metric' },
    headers: {
      'content-type': 'application/json',
    },
  });

  const {
    main: { temp, pressure, humidity },
    visibility,
    wind: { speed },
  } = res.data;

  return {
    pressure,
    humidity,
    visibility,
    temperature: temp,
    wind_speed: speed,
  };
};
