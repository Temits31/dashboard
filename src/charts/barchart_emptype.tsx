import React from 'react'

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
  import { faker } from '@faker-js/faker';
  
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
  
  const labels = ['PT', 'FT'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Employee Type Count',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })), 
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
      }
    ],
  };

const BarchartEmptype = () => {
  return (
      <div style={{ height: '400px', width: '100%' }}>
        <Bar options={options} data={data} />
      </div>
    );
}

export default BarchartEmptype