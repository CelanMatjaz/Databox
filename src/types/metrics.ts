export interface githubMetrics {
  forks_count: number;
  open_issues: number;
  default_branch: string;
  language: string;
  subscribers_count: number;
}

export interface weatherMetrics {
  weather: string;
  weather_description: string;
  temperature: number;
  visibility: number;
  wind_speed: number;
}

export type metrics = githubMetrics & weatherMetrics;
