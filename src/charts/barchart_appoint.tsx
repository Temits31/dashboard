import React from 'react'
import { useEffect, useState } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Appointment Status Chart',
        font: {
          size: 24,
        },
      },
      tooltip: {
        bodyFont: {
          size: 18,
        },
        titleFont: {
          size: 18,
        },
      }
    },
  };
  const BarchartAppointStat = () => {
    const [chartData, setChartData] = useState<any>({
      labels: [],
      datasets: [],
    });
  
    useEffect(() => {
      fetch('http://localhost/PJG/dashboard/dashboard/react-php/getAppoint.php')
        .then((res) => res.json())
        .then((data) => {
          const labels = data.map((item: any) => item.appointStatus);
          const counts = data.map((item: any) => item.count);
  
          setChartData({
            labels,
            datasets: [
              {
                label: 'Appointment Status Type',
                data: counts,
                backgroundColor:['#134611', '#f3de2c'],
              },
            ],
          });
        });
    }, []);

  return (
    <div style={{ height: '400px' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};


export default BarchartAppointStat