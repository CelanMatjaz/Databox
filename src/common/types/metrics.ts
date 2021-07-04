export interface githubMetrics {
  forks_count: number;
  open_issues: number;
  branches_count: number;
  watchers_count: number;
  subscribers_count: number;
}

export interface weatherMetrics {
  humidity: number;
  pressure: number;
  temperature: number;
  visibility: number;
  wind_speed: number;
}

export type metrics = githubMetrics & weatherMetrics;
