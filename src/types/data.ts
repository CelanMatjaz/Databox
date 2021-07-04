export type Service = 'github' | 'weather_api';

export interface Data {
  service: Service;
  timestamp: Date;
  metricsSent: { [key: string]: any };
  kpis: number;
  status: string;
  error: string;
}
