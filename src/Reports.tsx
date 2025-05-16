import { useState } from "react";
import BarchartEmptype from "./charts/barchart_emptype";
import Horbarchart_department from "./charts/horbarchart_department";
import BarchartisFilled from "./charts/barchart_isFilled";
import PieChartGender from "./charts/piechart_gender";
import PieChartCS from "./charts/piechart_cselig";
import PieChartDivision from "./charts/piechart_division";
import PieChartSG from "./charts/piechart_SG";
import BarchartAppointStat from "./charts/barchart_appoint";
import { toPng } from "html-to-image";

import { ChevronLeft, ChevronRight } from "react-feather";
import bg from "./assets/bg.jpg";

const Reports = () => {
  const charts = [
    {
      component: <PieChartGender />,
      title: "Gender Distribution",
      description: "This chart shows the gender distribution of employees.",
    },
    {
      component: <Horbarchart_department />,
      title: "Department Stats",
      description: "Displays number of employees per department.",
    },
    {
      component: <BarchartisFilled />,
      title: "Position Status",
      description: "Shows whether positions are filled or unfilled.",
    },
    {
      component: <BarchartEmptype />,
      title: "Employment Type",
      description: "Represents different employment types in the organization.",
    },
    {
      component: <PieChartCS />,
      title: "Civil Service Eligibility Chart",
      description: "Represents different employment types in the organization.",
    },
    {
      component: <PieChartDivision />,
      title: "Division Distribution Chart",
      description: "Represents different employment types in the organization.",
    },
    {
      component: <PieChartSG />,
      title: "Salary Grade Chart",
      description: "Represents different employment types in the organization.",
    },
    {
      component: <BarchartAppointStat />,
      title: "Appointment Status Chart",
      description: "Represents different employment types in the organization.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const handleExportChart = async () => {
    const chart = charts[current];
    const chartElement = document.getElementById(`chart-${current}`);
    if (!chartElement) {
      console.error("Chart element not found!");
      return;
    }

    try {
      const dataUrl = await toPng(chartElement);

      const response = await fetch(
        "http://localhost/LMSv1/Dashboard/my-app/react-php/printINDchart.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: dataUrl,
            description: [
              `Chart Title: ${chart.title}`,
              `Description: ${chart.description}`,
              `Generated on: ${new Date().toLocaleString()}`,
            ],
            
          }),
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${chart.title.replace(/\s+/g, "_")}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting chart:", err);
    }
  };
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % charts.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + charts.length) % charts.length);
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 bg-[#1C5C41] z-0"></div>

      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 z-10"
        style={{ backgroundImage: `url(${bg})`, transform: "rotate(180deg)" }}
      ></div>

      <div className="relative z-20 flex items-center justify-center h-full text-white">
        <div className="relative w-full max-w-[95%] min-h-[750px] bg-[#FAF5F2] rounded-xl p-6 shadow-md">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full overflow-hidden rounded-lg shadow-lg">
              <div
                className="min-h-[700px] w-full whitespace-nowrap transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${current * 100}%)`,
                  display: "flex",
                }}
              >
                {charts.map((item, index) => (
                  <div
                    key={index}
                    className="w-full bg-white p-6 flex items-center justify-center"
                    style={{ flex: "0 0 100%" }}
                  >
                    <div className="chart-container" id={`chart-${index}`} style={{ width: "90%", height: "400px" }}>
                      {item.component}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleExportChart}
                style={{ position: "relative", zIndex: 1000 }}
                className="mt-4 px-4 py-2 bg-green-700 text-white rounded"
              >
                Export to Word
              </button>
            </div>

            {/* RIGHT: Description */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-[#1C5C41] px-4">
              <h2 className="text-2xl font-bold mb-2">
                {charts[current].title}
              </h2>
              <p className="text-md text-gray-700">
                {charts[current].description}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
