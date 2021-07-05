import { JsonDB } from 'node-json-db';
import { getData, saveDataToDb } from './../../src/server/db';
import dotenv from 'dotenv';
import { expect } from 'chai';
import { Data } from '../../src/common/types/data';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import * as fs from 'fs';
import { after } from 'mocha';

dotenv.config();

describe('database', () => {
  const dbFilePath = './test/test_db.json';
  let testDb: JsonDB = new JsonDB(new Config(dbFilePath, true, true, '/'));

  const data: Data = {
    service: 'Github',
    timestamp: new Date(),
    metricsSent: { metric1: 1, metric2: 2 },
    kpis: 0,
    status: 'OK',
  };

  after(() => {
    fs.rmSync(dbFilePath);
  });

  describe('saveDataToDb', () => {
    afterEach(() => {
      testDb.delete('/data');
    });

    it('should save data to the db', async () => {
      saveDataToDb(testDb, data);

      const returnedData = testDb.getData('/data')[0];

      expect(returnedData).to.not.be.null;
      expect(returnedData.service).to.equal(data.service);
      expect(returnedData.timestamp).to.equal(data.timestamp);
      expect(returnedData.metricsSent).to.equal(data.metricsSent);
      expect(returnedData.kpis).to.equal(data.kpis);
      expect(returnedData.status).to.equal(data.status);
    });
  });

  describe('getData', () => {
    afterEach(() => {
      testDb.delete('/data');
    });

    it('should return all saved data', () => {
      saveDataToDb(testDb, data);

      const returnedData = getData(testDb);

      expect(returnedData).to.not.be.null;
      expect(returnedData.length).to.equal(1);
    });
  });
});
