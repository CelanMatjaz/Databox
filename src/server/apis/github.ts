import { githubMetrics } from './../../types/metrics';
import axios, { AxiosResponse } from 'axios';

type GithubResponse = Omit<githubMetrics, 'branches_count'> & {
  branches_url: string;
};

export const fetchGithubData = async (
  accessToken: string,
  tokenType: string
): Promise<githubMetrics> => {
  const res = await axios.get<{}, AxiosResponse<GithubResponse>>(
    'https://api.github.com/repos/CelanMatjaz/Databox',
    {
      headers: { Authorization: `${tokenType} ${accessToken}` },
    }
  );

  const { forks_count, open_issues, watchers_count, subscribers_count } =
    res.data;

  const branchesRes = await axios.get<{}, AxiosResponse<[]>>(
    res.data.branches_url.split('{')[0]
  );

  return {
    forks_count,
    open_issues,
    branches_count: branchesRes.data.length,
    watchers_count,
    subscribers_count,
  };
};
