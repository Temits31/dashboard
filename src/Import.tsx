import React, { useState } from "react";
import * as XLSX from "xlsx";
import NavBar from "./NavBar";

const Import = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      readExcelFile(selectedFile);
    }
  };

  const readExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const ab = e.target?.result;
      const workbook = XLSX.read(ab, { type: "array" });

      console.log("Workbook loaded:", workbook);
      console.log("Sheet names in the workbook:", workbook.SheetNames);

      const sheetName = "PSIPOP BLANK";
      const sheet = workbook.Sheets[sheetName];

      if (!sheet) {
        console.error(`Sheet "${sheetName}" not found`);
        return;
      }

      console.log("Sheet Data:", sheet);

      let jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      jsonData = jsonData.slice(7);
      console.log("Raw JSON Data:", jsonData);

      const dataFromB8 = jsonData;
      console.log("Data from B8:", dataFromB8);

      setData(dataFromB8);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async () => {
    if (data.length > 0) {
      const filteredData = data.filter(
        (row) => Array.isArray(row) && row.length > 0
      );
  
      const transformedData = filteredData.map((row) => {
       
        return [
          row[1],  // item_number
          row[2],  // pos_title
          row[3],  // salary_grade
          row[4],  // isposFirstlvl
          row[5],  // isposSeclvl
          row[6],  // isposExeclvl
          row[7],  // empType
          row[8],  // authorizedAnnualSal
          row[9],  // actualAnnualSal
          row[10], // monthlySal
          row[11], // stepSal
          row[12], // areaCode
          row[13], // areaType
          row[14], // level
          row[15], // attribution
          row[16], // incumbentFullName
          row[17], // isFilled
          row[18], // isUnfilled
          row[19], // division
          row[20], // department
          row[21], // lastName
          row[22], // firstName
          row[23], // middleName
          row[24], // sex
          row[25], // birthdate
          row[31], // tinNumber
          row[32], // origAppointDate
          row[33], // lastPromotionDate
          row[34], // appointStatus
          row[35], // CSElig
        console.log(row[25])

        ];

      });

  
      function chunkArray(arr: any[], chunkSize: number) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
          chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
      }
  
      const chunkedData = chunkArray(transformedData, 10);
  
      for (let i = 0; i < chunkedData.length; i++) {
        const chunk = chunkedData[i];
        console.log(`Uploading chunk ${i + 1} with ${chunk.length} rows`);
  
        const response = await fetch(
          "http://localhost/LMSv1/Dashboard/my-app/react-php/importXLSX.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(chunk),
          }
        );
  
        console.log(`Data being sent to backend (chunk ${i + 1}):`, chunk);
  
        const result = await response.json();
  
        if (result.status === "success") {
          console.log(`Chunk ${i + 1} uploaded successfully.`);
        } else {
          console.error(`Error uploading chunk ${i + 1}:`, result.message);
        }
      }
  
      alert("All data has been successfully uploaded!");
    } else {
      alert("No data to upload!");
    }
  };
    return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />

      <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Import Excel Data
          </h1>

          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm mb-4"
          />

          <button
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            Import Data
          </button>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Preview Data
            </h2>
            <pre className="text-sm text-gray-700 mt-2 whitespace-pre-wrap bg-gray-50 p-4 rounded-md border border-gray-200">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Import;
