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


export function BarchartisFilled() {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch('http://localhost/PJG/dashboard/dashboard/react-php/getisFilled.php',{
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((item: any) => item.status);
        const filled = data.map((item: any) => item.filled);
        const unfilled = data.map((item: any) => item.unfilled);


        setChartData({
          labels,
          datasets: [
            {
              label: "Filled",
              data: filled,
              backgroundColor: "#134611"
            },
            {
              label: "Unfilled",
              data: unfilled,
              backgroundColor: "#f3de2c"
            }
            
          ],
        });
      });
  }, []);
   return (
      <div className='w-full h-full'>
        <Bar options={options} data={chartData} />
      </div>
    );
}


export default BarchartisFilled;