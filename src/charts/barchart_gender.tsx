import React from 'react';
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
      text: 'Gender Distribution Chart',
    },
  },
};

const labels = ['Male', 'Female'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Gender Count',
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })), 
      backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
    }
  ],
};

const BarchartGender = () => {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarchartGender;
