import * as React from 'react';
import { Data } from '../common/types/data';
import Card from './components/Card';

export const App: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('/data');
    const data = await res.json();
    setData(data);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container'>
      <div>
        <button id='update-button' onClick={fetchData}>
          {' '}
          Update
        </button>
      </div>
      <h1
        style={{
          borderBottom: '2px solid #313131',
        }}>
        Data
      </h1>

      <div className='data'>
        {loading ? (
          'Loading...'
        ) : data.length > 0 ? (
          data.map((card, i) => <Card {...card} key={i} />)
        ) : (
          <h2>No data to display...</h2>
        )}
      </div>
    </div>
  );
};

export default App;
