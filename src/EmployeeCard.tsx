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
import EmpSection from "./EmpSection";
import Reports from "./Reports";
import DepartmentFilledChart from "./charts/grouped_chart_filled";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost/LMSv1/Dashboard/my-app/react-php/getData.php")
      .then((res) => res.json())
      .then((data) => setRowdata(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);
  const [filterFilled, setFilterFilled] = useState(false);
  const [filterUnfilled, setFilterUnfilled] = useState(false);
  const [filterDept, setFilterDept] = useState("");
  const [filterElig, setFilterElig] = useState("");
  const [filterSG, setFilterSG] = useState("");
  const filteredData = rowdata.filter((item) => {
    const searchMatch = (
      item.firstName +
      " " +
      item.middleName +
      " " +
      item.lastName +
      " " +
      item.pos_title +
      " " +
      item.department +
      " " +
      item.division +
      " " +
      item.incumbetFullName
    )
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const filledMatch =
      (!filterFilled && !filterUnfilled) ||
      (filterFilled && item.isFilled === "1") ||
      (filterUnfilled && item.isUnfilled === "1");

    const deptMatch = !filterDept || item.department === filterDept;
    const eligMatch = !filterElig || item.CSElig === filterElig;

    return searchMatch && filledMatch && deptMatch && eligMatch;
  });

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Filtered Data");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "filtered_report.xlsx");
  };

  return (
    <>
      <div className="bg-[#5F8B4C]  rounded-2xl p-6 w-[90%] h-auto mx-auto mt-10 mb-10">
        <div className="grid grid-rows-3 gap-6 mt-10">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#A9C46C] shadow-md rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Gender Distribution Chart
              </h3>
              <PieChartGender />
            </div>

            <div className="bg-shadow-md bg-[#A9C46C] col-span-2 rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Department Chart
              </h3>
              <div className="w-full">
                <Horbarchart_department />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#A9C46C] shadow-md rounded-lg p-4 flex flex-col items-center h-auto">
              <h3 className="text-lg font-semibold text-gray-700">
                Filled/Unfilled Item Chart
              </h3>
              <BarchartisFilled />
            </div>

            <div className="bg-[#A9C46C] shadow-md rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Employee Type Chart
              </h3>
              <BarchartEmptype />
            </div>

            <div className="bg-[#A9C46C] shadow-md rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Civil Service Eligibility Chart
              </h3>
              <PieChartCS />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#A9C46C] shadow-md rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Division Distribution Chart
              </h3>
              <PieChartDivision />
            </div>

            <div className="bg-[#A9C46C] shadow-md rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Salary Grade Chart
              </h3>
              <PieChartSG />
            </div>

            <div className="bg-[#A9C46C] shadow-md rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Appointment Status Chart
              </h3>
              <BarchartAppointStat />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#A9C46C] shadow-md rounded-lg p-4 flex flex-col items-center col-span-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Filled and Unfilled Items per Department
              </h3>
              <DepartmentFilledChart></DepartmentFilledChart>
            </div>
            <div className="bg-[#A9C46C] shadow-md rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-700">Card</h3>
            </div>
          </div>
        </div>

        <div className="my-6">
          <input
            type="text"
            placeholder="Search by name, title, or department..."
            className="w-full max-w-md p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <label>
            <input
              type="checkbox"
              checked={filterFilled}
              onChange={() => setFilterFilled(!filterFilled)}
            />
            Filled
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterUnfilled}
              onChange={() => setFilterUnfilled(!filterUnfilled)}
            />
            Unfilled
          </label>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="">All Departments</option>
            {[...new Set(rowdata.map((d) => d.department))].map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            value={filterElig}
            onChange={(e) => setFilterElig(e.target.value)}
          >
            <option value="">All Eligibility</option>
            {[...new Set(rowdata.map((d) => d.CSElig))].map((elig) => (
              <option key={elig} value={elig}>
                {elig}
              </option>
            ))}
          </select>
          <select
            value={filterSG}
            onChange={(e) => setFilterSG(e.target.value)}
          >
            <option value="">All Salary Grades</option>
            {[...new Set(rowdata.map((d) => d.salary_grade))].map((sg) => (
              <option key={sg} value={sg}>
                {sg}
              </option>
            ))}
          </select>
        </div>
        <div>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-green-600 text-white rounded mt-2"
        >
          Export Filtered Data
        </button>
        </div>

        <div className="overflow-x-auto mt-6">
          <div className="h-[600px] overflow-y-auto border border-gray-700 bg-white">
            <table className="min-w-full">
              <thead className="bg-[#1F4529] text-white sticky top-0 z-10">
                <tr>
                  {[
                    "Item Number",
                    "Position Title",
                    "Salary Grade",
                    "Step",
                    "First Level",
                    "Second Level",
                    "Executive Level",
                    "Emp Type",
                    "Authorized Salary",
                    "Actual Salary",
                    "Monthly Salary",
                    "Area Code",
                    "Area Type",
                    "Level",
                    "Attribution",
                    "Incumbent",
                    "Filled",
                    "Unfilled",
                    "Division",
                    "Department",
                    "Last Name",
                    "First Name",
                    "Middle Name",
                    "Sex",
                    "Birth Date",
                    "Age",
                    "TIN Number",
                    "Orig. Appointment Date",
                    "Last Promotion Date",
                    "Appointment Status",
                    "CS Eligibility",
                  ].map((header, idx) => (
                    <th key={idx} className="p-3 border">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
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
        
      </div>

      <div className="pt-9">
        <div className="max-w-full mt-10">
          <Reports />
        </div>
      </div>
    </>
  );
};

export default EmployeeCard;
