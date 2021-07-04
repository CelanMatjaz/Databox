import { client, insertMetrics } from './databox';
import { metrics } from '../common/types/metrics';
import { Data, Service } from '../common/types/data';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

import config from './config';

export const db = new JsonDB(new Config(config.dbFileName, true, true, '/'));

const dataString = '/data';

export const saveDataToDb = (data: Data) => {
  db.push(dataString, data);
};

export const saveAndSendMetrics = (
  apiData: Partial<metrics>,
  service: Service
) => {
  insertMetrics(client, apiData, (res) => {
    const data: Data = {
      service,
      timestamp: new Date(),
      metricsSent: apiData,
      kpis: 0,
      status: res.status,
      error: res.message,
    };

    saveDataToDb(data);
  });
};

export const getData = () => {
  return db.getData(dataString);
};
