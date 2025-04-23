import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: {
      display: true,
      text: 'CS Eligibility Pie Chart',
    },
  },
};

const PieChartCS = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch('http://localhost/LMSv1/Dashboard/my-app/react-php/getCS.php')
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((item: any) => item.CSElig);
        const counts = data.map((item: any) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Civil Service Eligibility Chart',
              data: counts,
              backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(53, 162, 235, 0.6)'],
              borderColor: ['rgba(255, 99, 132, 1)', 'rgba(53, 162, 235, 1)'],
              borderWidth: 1,
            },
          ],
        });
      });
  }, []);

  return (
    <div style={{ height: '400px', width: '400px', margin: '0 auto' }}>
      <Pie options={options} data={chartData} />
    </div>
  );
};

export default PieChartCS;
