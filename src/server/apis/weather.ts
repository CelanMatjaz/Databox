import { weatherMetrics } from './../../types/metrics';
import axios, { AxiosResponse } from 'axios';

const city = 'maribor';
const API_KEY = process.env.WEATHER_API_KEY;

export const fetchWeatherData = async (): Promise<weatherMetrics> => {
  try {
    const res = await axios.get<
      {},
      AxiosResponse<{
        weather: { main: string; description: string };
        main: { temp: number };
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
      weather: { main, description },
      main: { temp },
      visibility,
      wind: { speed },
    } = res.data;

    return {
      weather: 'sunny',
      weather_description: 'clear',
      temperature: 25,
      visibility: 10000,
      wind_speed: 0.45,
    };
  } catch {
    console.log('couldnt get weather data, adding custom data');
    return {
      weather: 'sunny',
      weather_description: 'clear',
      temperature: 25,
      visibility: 10000,
      wind_speed: 0.45,
    };
  }
};
