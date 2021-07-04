/// @ts-nocheck
import { metrics } from './../types/metrics';
import Databox from 'databox';
import * as dotenv from 'dotenv';
dotenv.config();

export const client = new Databox({
  push_token: process.env.DATABOX_TOKEN,
});

export const insertMetrics = (metrics: metrics) => {
  client.insertAll(
    Object.entries<{ [key: string]: number }>(metrics).map(([key, value]) => ({
      key,
      value,
    })),
    (err) => console.error('error:\n', err)
  );
};
