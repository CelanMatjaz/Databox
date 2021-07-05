import { expect } from 'chai';
import { fetchGithubData, getToken } from '../../../src/server/apis/github';
import config from '../../../src/server/config';

describe('github api', () => {
  before(() => {});

  describe('fetchGithubData', () => {
    it('should fetch github data', async () => {
      const data = await fetchGithubData('', '');

      expect(data).to.not.be.null;
    });

    it('should return all the required fields for metrics', async () => {
      const data = await fetchGithubData('', '');
      const {
        forks_count,
        open_issues,
        branches_count,
        watchers_count,
        subscribers_count,
      } = data;

      expect(forks_count).to.not.be.undefined;
      expect(open_issues).to.not.be.undefined;
      expect(branches_count).to.not.be.undefined;
      expect(watchers_count).to.not.be.undefined;
      expect(subscribers_count).to.not.be.undefined;
    });
  });

  describe('getToken', () => {
    it('should fail getting the token with wrong credentials', async () => {
      expect(await getToken(config.clientId, config.clientSecret, 'code')).to
        .throw;
    });
  });
});
