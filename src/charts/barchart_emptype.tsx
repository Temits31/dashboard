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
        text: 'Employee Type Distribution Chart',
      },
    },
  };
  const BarchartEmptype = () => {
    const [chartData, setChartData] = useState<any>({
      labels: [],
      datasets: [],
    });
  
    useEffect(() => {
      fetch('http://localhost/LMSv1/Dashboard/my-app/react-php/getEmpType.php')
        .then((res) => res.json())
        .then((data) => {
          const labels = data.map((item: any) => item.empType);
          const counts = data.map((item: any) => item.count);
  
          setChartData({
            labels,
            datasets: [
              {
                label: 'Employee Type',
                data: counts,
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
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


export default BarchartEmptype