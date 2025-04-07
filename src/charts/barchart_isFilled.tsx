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
import { useEffect,useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'x' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'isFilled',
    },
  },
};


export function BarchartisFilled() {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch('http://localhost/LMSv1/Dashboard/my-app/react-php/getisFilled.php')
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((item: any) => item.status);
        const counts = data.map((item: any) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Item Status',
              data: counts,
              backgroundColor: ['rgba(255, 99, 132, 0.5)','rgba(53, 162, 235, 0.5)'],
            },
          ],
        });
      });
  }, []);
   return (
      <div>
        <Bar options={options} data={chartData} />
      </div>
    );
}


export default BarchartisFilled;