import * as React from 'react';
import { Data } from '../../common/types/data';

export type Props = Data;

export const Card: React.FC<Props> = ({
  service,
  timestamp,
  metricsSent,
  kpis,
  status,
  error,
}) => {
  return (
    <div className='card'>
      <ul>
        <li>Service: {service}</li>
        <li>Time: {timestamp}</li>
        <li>
          Metrics sent:
          <div>
            {Object.entries(metricsSent).map(([metric, value], i) => (
              <div key={i} style={{ marginLeft: '20px' }}>
                {metric}: {value}
              </div>
            ))}
          </div>
        </li>
        <li>Kpis: {kpis}</li>
        <li>Status: {status}</li>
        {status !== 'OK' && <li>Error message: {error}</li>}
      </ul>
    </div>
  );
};

export default Card;
