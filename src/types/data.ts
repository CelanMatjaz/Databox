type service = 'github' | 'weather_api';

export interface data {
  service: service;
  timestamp: Date;
  metricsSent: { [key: string]: any };
  kpis: number;
  status: string;
  error: string;
}
