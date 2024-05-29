import React, { useContext, useEffect, useState } from 'react';
import './Coin.css'; 
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/coincontext'; 
import LineChart from '../../components/LineChart/LineChart'; 

const Coin = () => {
  const { coinId } = useParams(); // Extract coin ID from URL parameters
  const [coinData, setCoinData] = useState(null); // State for coin data (initialized to null)
  const [historicalData, setHistoricalData] = useState(null); // State for historical data (initialized to null)
  const { currency } = useContext(CoinContext); // Access currency information from context

  // Fetch coin data from API
  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-dpbZEcwBTuikHT2UJRTdVLjq', // Replace with your API key
      },
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error(error); // Handle errors gracefully
    }
  };

  // Fetch historical data from API
  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-dpbZEcwBTuikHT2UJRTdVLjq', // Replace with your API key
      },
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options);
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error(error); // Handle errors gracefully
    }
  };

  // Fetch data on component mount and whenever currency changes
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]); // Dependency array includes currency

  // Render content conditionally based on data availability
  return (
    <div className="coin">
      {coinData && historicalData ? (
        <>
          <div className="coin-name">
            <img src={coinData.image.large} alt={`${coinData.name} image`} />
            <p>
              <b className='coin-name-b'>
                {coinData.name} ({coinData.symbol.toUpperCase()})
              </b>
            </p>
          </div>
          <div className="coin-chart">
            <LineChart historicalData={historicalData} />
          </div>

          <div className="coin-info">
            <ul>
                <li>Crypto Market Rank</li>
                <li>{coinData.market_cap_rank}</li>
            </ul>
            <ul>
                <li>Price</li>
                <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
            </ul>
            <ul>
                <li>Market Cap</li>
                <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
            </ul>
            <ul>
                <li>24 Hour High</li>
                <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
            </ul>
            <ul>
                <li>24 Hour Low</li>
                <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
            </ul>
          </div>
        </>
      ) : (
        <div className="spinner">
          <div className="spin"></div>
        </div>
      )}
    </div>
  );
};

export default Coin;
