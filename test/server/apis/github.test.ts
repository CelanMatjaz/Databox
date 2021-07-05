import { expect } from 'chai';
import { fetchGithubData } from '../../../src/server/apis/github';

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
});
