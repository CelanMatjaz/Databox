import { insertMetrics } from './../../src/server/databox';
import { expect } from 'chai';
import Databox from 'databox';
import config from '../../src/server/config';

describe('databox', () => {
  describe('insertMetrics', () => {
    const client = new Databox({ push_token: config.databoxToken });

    it('should send and save metrics', () => {
      insertMetrics(client, { watchers_count: 0 }, (res) => {
        expect(res.status).to.equal('OK');
      });
    });
  });
});
