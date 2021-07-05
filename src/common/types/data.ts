export type Service = 'Github' | 'Weather api';

export interface Data {
  service: Service;
  timestamp: Date;
  metricsSent: { [key: string]: number };
  kpis: number;
  status: string;
  error?: string;
}
