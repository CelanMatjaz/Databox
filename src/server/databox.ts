/// @ts-nocheck
import { metrics } from '../common/types/metrics';
import Databox from 'databox';

import config from './config';

export interface DataboxResponse {
  status: string;
  message: string;
  id: string;
}

export const client = new Databox({
  push_token: config.databoxToken,
});

export const insertMetrics = (
  client: typeof Databox,
  metrics: Partial<metrics>,
  cb?: (response?: DataboxResponse) => void
) => {
  client.insertAll(
    Object.entries<{ [key: string]: number }>(metrics).map(([key, value]) => ({
      key,
      value,
    })),
    cb
  );
};
