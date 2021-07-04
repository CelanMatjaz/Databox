import { weatherMetrics } from '../../common/types/metrics';
import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const city = 'maribor';
const API_KEY = process.env.WEATHER_API_KEY;

export const fetchWeatherData = async (): Promise<weatherMetrics> => {
  const res = await axios.get<
    {},
    AxiosResponse<{
      main: { temp: number; pressure: number; humidity: number };
      visibility: number;
      wind: { speed: number };
    }>
  >(`http://api.openweathermap.org/data/2.5/weather`, {
    params: { q: city, appid: API_KEY, units: 'metric' },
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
