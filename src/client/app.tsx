import * as React from 'react';
import { Data } from '../common/types/data';
import Card from './components/Card';

export const App: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/data');
      const data = await res.json();

      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <h1
        style={{
          borderBottom: '2px solid #313131',
        }}>
        Data
      </h1>
      <div className='data'>
        {data.map((card, i) => (
          <Card {...card} key={i} />
        ))}
      </div>
    </div>
  );
};

export default App;
