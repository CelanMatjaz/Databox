import { githubMetrics } from './../../types/metrics';
import axios from 'axios';

export const fetchGithubData = async (
  accessToken: string,
  tokenType: string
): Promise<githubMetrics> => {
  const res = await axios.get(
    'https://api.github.com/repos/CelanMatjaz/Databox',
    { headers: { Authorization: `${tokenType} ${accessToken}` } }
  );

  const {
    forks_count,
    open_issues,
    default_branch,
    language,
    subscribers_count,
  } = res.data;

  return {
    forks_count,
    open_issues,
    default_branch,
    language,
    subscribers_count,
  };
};
