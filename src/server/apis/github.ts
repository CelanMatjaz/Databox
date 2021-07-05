import axios, { AxiosResponse } from 'axios';
import { githubMetrics } from '../../common/types/metrics';

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

export const getToken = async (
  client_id: string,
  client_secret: string,
  code: string
): Promise<{ access_token: string; token_type: string }> => {
  const response = await axios.get<
    {},
    AxiosResponse<{ access_token: string; token_type: string; scope: string }>
  >('https://github.com/login/oauth/access_token', {
    params: {
      client_id,
      client_secret,
      code,
    },
    headers: { Accept: 'application/json' },
  });

  const { access_token, token_type } = response.data;

  return {
    access_token,
    token_type,
  };
};
