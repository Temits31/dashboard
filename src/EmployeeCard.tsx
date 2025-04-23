import { useEffect, useState } from "react";
import BarchartGender from "./charts/piechart_gender";
import BarchartEmptype from "./charts/barchart_emptype";
import Horbarchart_department from "./charts/horbarchart_department";
import BarchartisFilled from "./charts/barchart_isFilled";
import PieChartGender from "./charts/piechart_gender";
import PieChartCS from "./charts/piechart_cselig";
import PieChartDivision from "./charts/piechart_division";
import PieChartSG from "./charts/piechart_SG";
import BarchartAppointStat from "./charts/barchart_appoint";

type RowData = {
  item_number: string;
  pos_title: string;
  salary_grade: number;
  stepSal: number;
  isposFirstlvl: string;
  isposSeclvl: string;
  isposExeclvl: string;
  empType: string;
  authorizedAnnualSal: number;
  actualAnnualSal: number;
  monthlySal: number;
  areaCode: string;
  areaType: string;
  level: string;
  attribution: string;
  incumbetFullName: string;
  isFilled: string;
  isUnfilled: string;
  division: string;
  department: string;
  lastName: string;
  firstName: string;
  middleName: string;
  sex: string;
  dateofBirth: string;
  age: number;
  tinNumber: string;
  origAppointDate: string;
  lastPromotionDate: string;
  appointStatus: string;
  CSElig: string;
};

const EmployeeCard = () => {
  const [rowdata, setRowdata] = useState<RowData[]>([]);

  useEffect(() => {
    fetch("http://localhost/LMSv1/Dashboard/my-app/react-php/getData.php")
      .then((res) => res.json())
      .then((data) => setRowdata(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-300 w-[90%] h-auto mx-auto mt-10">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Employee Overview</h2>
      <div className="grid grid-rows-3 gap-6">

      <div className="grid grid-cols-3 gap-4">
          <div  className="bg-blue-100 shadow-md rounded-lg p-4 flex flex-col items-center">
            <PieChartGender></PieChartGender>
            
          </div>
          <div  className="bg-blue-100 shadow-md col-span-2 rounded-lg p-4 flex flex-col  items-center">
          
            <h3 className="text-lg font-semibold text-gray-700">Card</h3>
            <div className="w-[100%]">
            <Horbarchart_department></Horbarchart_department>


            </div>

          </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
          <div  className="bg-blue-100 shadow-md rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700">Card</h3>
            <BarchartisFilled></BarchartisFilled>
          </div>
          <div  className="bg-blue-100 shadow-md rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700">Card</h3>
            <BarchartEmptype></BarchartEmptype>

          </div>
          <div  className="bg-blue-100 shadow-md rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700">Card</h3>
            <PieChartCS></PieChartCS>
          </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
          <div  className="bg-blue-100 shadow-md rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700">Card</h3>
            <PieChartDivision></PieChartDivision>
          </div>
          <div  className="bg-blue-100 shadow-md rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700">Card</h3>
            <PieChartSG></PieChartSG>
          </div>
          <div  className="bg-blue-100 shadow-md rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700">Card</h3>
            <BarchartAppointStat></BarchartAppointStat>

          </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
          <div  className="bg-blue-100 shadow-md rounded-lg p-4 flex flex-col items-center col-span-2">
            <h3 className="text-lg font-semibold text-gray-700">Card</h3>
         </div>
          <div  className="bg-blue-100 shadow-md rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700">Card</h3>

          </div>
      </div>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 border">Item Number</th>
              <th className="p-3 border">Position Title</th>
              <th className="p-3 border">Salary Grade</th>
              <th className="p-3 border">Step</th>
              <th className="p-3 border">First Level</th>
              <th className="p-3 border">Second Level</th>
              <th className="p-3 border">Executive Level</th>
              <th className="p-3 border">Emp Type</th>
              <th className="p-3 border">Authorized Salary</th>
              <th className="p-3 border">Actual Salary</th>
              <th className="p-3 border">Monthly Salary</th>
              <th className="p-3 border">Area Code</th>
              <th className="p-3 border">Area Type</th>
              <th className="p-3 border">Level</th>
              <th className="p-3 border">Attribution</th>
              <th className="p-3 border">Incumbent</th>
              <th className="p-3 border">Filled</th>
              <th className="p-3 border">Unfilled</th>
              <th className="p-3 border">Division</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Last Name</th>
              <th className="p-3 border">First Name</th>
              <th className="p-3 border">Middle Name</th>
              <th className="p-3 border">Sex</th>
              <th className="p-3 border">Birth Date</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border">TIN Number</th>
              <th className="p-3 border">Orig. Appointment Date</th>
              <th className="p-3 border">Last Promotion Date</th>
              <th className="p-3 border">Appointment Status</th>
              <th className="p-3 border">CS Eligibility</th>
            </tr>
          </thead>
          <tbody>
            {rowdata.map((row, index) => (
              <tr key={index} className="border-t">
                 <td className="p-3 border">{row.item_number}</td>
                <td className="p-3 border">{row.pos_title}</td>
                <td className="p-3 border">{row.salary_grade}</td>
                <td className="p-3 border">{row.stepSal}</td>
                <td className="p-3 border">{row.isposFirstlvl}</td>
                <td className="p-3 border">{row.isposSeclvl}</td>
                <td className="p-3 border">{row.isposExeclvl}</td>
                <td className="p-3 border">{row.empType}</td>
                <td className="p-3 border">{row.authorizedAnnualSal}</td>
                <td className="p-3 border">{row.actualAnnualSal}</td>
                <td className="p-3 border">{row.monthlySal}</td>
                <td className="p-3 border">{row.areaCode}</td>
                <td className="p-3 border">{row.areaType}</td>
                <td className="p-3 border">{row.level}</td>
                <td className="p-3 border">{row.attribution}</td>
                <td className="p-3 border">{row.incumbetFullName}</td>
                <td className="p-3 border">{row.isFilled}</td>
                <td className="p-3 border">{row.isUnfilled}</td>
                <td className="p-3 border">{row.division}</td>
                <td className="p-3 border">{row.department}</td>
                <td className="p-3 border">{row.lastName}</td>
                <td className="p-3 border">{row.firstName}</td>
                <td className="p-3 border">{row.middleName}</td>
                <td className="p-3 border">{row.sex}</td>
                <td className="p-3 border">{row.dateofBirth}</td>
                <td className="p-3 border">{row.age}</td>
                <td className="p-3 border">{row.tinNumber}</td>
                <td className="p-3 border">{row.origAppointDate}</td>
                <td className="p-3 border">{row.lastPromotionDate}</td>
                <td className="p-3 border">{row.appointStatus}</td>
                <td className="p-3 border">{row.CSElig}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeCard;
