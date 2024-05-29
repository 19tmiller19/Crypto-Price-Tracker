import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([['Date', 'Price']]); // Initialize with headers

  useEffect(() => {
    if (historicalData && historicalData.prices) {
      const formattedData = historicalData.prices.map((item) => {
        // Extract Unix timestamp from item[0]
        const timestamp = new Date(item[0]);

        // **Highlight:** Format date as MM/DD (e.g., 05/28)
        const formattedDate = timestamp.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
        });

        return [formattedDate, item[1]]; // Use formatted date for x-axis, price for y-axis
      });
      setData([['Date', 'Price'], ...formattedData]); // Prepend headers
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="100%"
      legendToggle
      // **Optional Highlight:** Configure x-axis formatting (consider for large ranges)
      options={{
        hAxis: {
          title: 'Date',
          // Explore other formatting options as needed: https://developers.google.com/chart/interactive/docs/datesandtimes
        },
      }}
    />
  );
};

export default LineChart;