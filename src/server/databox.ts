/// @ts-nocheck
import { metrics } from './../types/metrics';
import Databox from 'databox';
import * as dotenv from 'dotenv';
dotenv.config();

export interface DataboxResponse {
  status: string;
  message: string;
  id: string;
}

export const client = new Databox({
  push_token: process.env.DATABOX_TOKEN,
});

export const insertMetrics = (
  metrics: Partial<metrics>,
  cb: (response?: DataboxResponse) => void = () => {}
) => {
  const a = client.insertAll(
    Object.entries<{ [key: string]: number }>(metrics).map(([key, value]) => ({
      key,
      value,
    })),
    cb
  );
};
