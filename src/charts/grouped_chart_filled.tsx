import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DepartmentFilledChart = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/PJG/dashboard/dashboard/react-php/getFilledUnfilledDept.php")
      .then((res) => res.json())
      .then((data) => {
        const departments = data.map((item: any) => item.department);
        const filledCounts = data.map((item: any) => item.filled);
        const unfilledCounts = data.map((item: any) => item.unfilled);

        setChartData({
          labels: departments,
          datasets: [
            {
              label: "Filled",
              data: filledCounts,
              backgroundColor: "#134611"
            },
            {
              label: "Unfilled",
              data: unfilledCounts,
              backgroundColor: "#f3de2c"
            }
          ]
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
        setLoading(false);
      });
  }, []);

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: "Filled vs Unfilled Items per Department",
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
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  return (
    <div className=" w-full">
      {loading ? (
        <p className="text-center text-gray-600">Loading chart...</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default DepartmentFilledChart;
