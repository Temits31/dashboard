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
      text: 'Age Distribution',
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


export function Histogram_age() {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch('http://localhost/PJG/dashboard/dashboard/react-php/getAge.php', {
        method: 'GET',
        credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((item: any) => item.ageGroup);
        const counts = data.map((item: any) => item.count);


        setChartData({
          labels,
          datasets: [
            {
              label: "Employee Age",
              data: counts,
              backgroundColor: "#134611"
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


export default Histogram_age;