import { useState } from "react";
import BarchartEmptype from "./charts/barchart_emptype";
import Horbarchart_department from "./charts/horbarchart_department";
import BarchartisFilled from "./charts/barchart_isFilled";
import PieChartGender from "./charts/piechart_gender";
import { ChevronLeft, ChevronRight } from "react-feather";
import bg from './assets/bg.jpg';

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
  ];

  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % charts.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + charts.length) % charts.length);
  };

  return (
    <div className="relative w-full h-screen">
  {/* Green solid background */}
  <div className="absolute inset-0 bg-[#1C5C41] z-0"></div>

  {/* Overlaying picture with transparency */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-50 z-10"
    style={{ backgroundImage: `url(${bg})`,  transform: 'rotate(180deg)', }}
  ></div>

  {/* Optional: Content on top */}
  <div className="relative z-20 flex items-center justify-center h-full text-white">
  <div className="relative w-full max-w-[95%] min-h-[750px] bg-[#FAF5F2] rounded-xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT: Chart Slider */}
          <div className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-lg">
            <div
              className="min-h-[700px] whitespace-nowrap transition-transform duration-500 ease-in-out"
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
                  {item.component}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Description */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-[#1C5C41] px-4">
            <h2 className="text-2xl font-bold mb-2">{charts[current].title}</h2>
            <p className="text-md text-gray-700">{charts[current].description}</p>
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
