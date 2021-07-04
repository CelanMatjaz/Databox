import { config } from 'dotenv';
config();

export interface Config {
  intervalTime: number;
  databoxToken: string;
  clientId: string;
  clientSecret: string;
  state: string;
  weatherApiKey: string;
  dbFileName: string;
  githubAccessToken: string;
  githubAccessTokenType: string;
}

const serverConfig: Config = {
  intervalTime: process.env.INTERVAL_TIME ? +process.env.INTERVAL_TIME : 3600,
  databoxToken: process.env.DATABOX_TOKEN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  state: process.env.STATE,
  weatherApiKey: process.env.WEATHER_API_KEY,
  dbFileName: process.env.DB ? process.env.DB : 'database.json',
  githubAccessToken: '',
  githubAccessTokenType: '',
};

export default serverConfig;
