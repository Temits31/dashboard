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
      text: 'Gender Distribution Pie Chart',
    },
  },
};

const PieChartGender = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch('http://localhost/LMSv1/Dashboard/my-app/react-php/getGender.php')
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((item: any) => item.gender);
        const counts = data.map((item: any) => item.count);

        

        setChartData({
          labels,
          datasets: [
            {
              label: 'Gender Count',
              data: counts,
              backgroundColor: ['#134611', '#f3de2c'],
              borderColor: ['#134611', '#f3de2c'],
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

export default PieChartGender;
