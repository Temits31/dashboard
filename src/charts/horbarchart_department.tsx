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
  indexAxis: 'y' as const,
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  layout: {
    padding: {
      right: 40,
      left: 40,
      top: 0,
      bottom: 0,
    },
  },

  
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Department',
    },
    
  },
 
};


export function Horbarchart_department() {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch('http://localhost/LMSv1/Dashboard/my-app/react-php/getDept.php')
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((item: any) => item.department);
        const counts = data.map((item: any) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Departments',
              data: counts,
              backgroundColor: ['#134611','#fbb02d','#5c8001','#7cb518','#f3de2c','#fb6107'],
              
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


export default Horbarchart_department;