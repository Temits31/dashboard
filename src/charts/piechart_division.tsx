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
      text: 'Division Pie Chart',
    },
  },
};

const PieChartDivision = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch('http://localhost/LMSv1/Dashboard/my-app/react-php/getDivision.php')
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((item: any) => item.division);
        const counts = data.map((item: any) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Division Chart',
              data: counts,
              backgroundColor:['#134611','#fbb02d','#5c8001','#7cb518','#f3de2c','#fb6107'],
              borderColor: ['#134611','#fbb02d','#5c8001','#7cb518','#f3de2c','#fb6107'],
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

export default PieChartDivision;
