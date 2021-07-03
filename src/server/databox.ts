/// @ts-nocheck
import { metrics } from './../types/metrics';
import Databox from 'databox';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new Databox({
  push_token: process.env.DATABOX_TOKEN,
});

export const insertMetrics = (metrics: metrics) => {
  client.insertAll(
    Object.entries(metrics).map(([key, value]) => {
      console.log('key:', key, ', value:', value);
      return {
        key,
        value,
      };
    }),
    (err) => console.error(err)
  );
};
