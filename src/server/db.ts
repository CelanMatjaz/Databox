import { insertMetrics } from './databox';
import { metrics } from './../types/metrics';
import { Data, Service } from './../types/data';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

export const db = new JsonDB(new Config('database.json', true, true, '/'));

export const saveDataToDb = (data: Data) => {
  db.push('/data[]', data);
};

export const saveAndSendMetrics = (
  apiData: Partial<metrics>,
  service: Service
) => {
  insertMetrics(apiData, (res) => {
    console.log(res);

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
