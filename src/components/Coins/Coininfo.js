import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './coininfo.css'

function Coininfo() {
  const { id } = useParams(); 
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!response.ok) {
          throw new Error('Invalid Data Request');
        }
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading)
     return <div className='display-loading'>Loading...</div>;
  if (error) 
    return <div className='display-error-msg'>Error: {error.message}</div>;

  return (
    <div className='coin-data'>
      <h1>{coinData?.name}</h1>
      <h2 className='symb'>Symbol:-{' '}{coinData?.symbol|| 'symbol not available'}</h2>
      <h3>Market_cap_rank:-{' '}{coinData?.market_cap_rank}</h3>
      <div className='description'>
        <h4>Description about {coinData?.name}{' '}:-</h4>
      <p>{coinData?.description.en}</p>
      </div>
    </div>
  );
}

export default Coininfo;
