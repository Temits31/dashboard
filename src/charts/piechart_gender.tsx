import React, { useEffect, useState } from "react";
import { FaMale, FaFemale, FaUserAlt } from "react-icons/fa";

const GenderSummary = () => {
  const [genderCounts, setGenderCounts] = useState({
    male: 0,
    female: 0,
    others: 0
  });

  useEffect(() => {
    fetch("http://localhost/PJG/dashboard/dashboard/react-php/getGender.php",{
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setGenderCounts(data));
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="flex justify-center gap-8">
        <div className="flex flex-col items-center">
          <FaMale className="text-blue-600 text-[200px]" />
          <span className="text-xl  text-gray-600  font-medium mt-2">{genderCounts.male} Male</span>
        </div>
        <div className="flex flex-col items-center">
          <FaFemale className="text-pink-600 text-[200px]" />
          <span className="text-xl text-gray-600 font-medium mt-2">{genderCounts.female} Female</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <FaUserAlt className="text-gray-600 text-[100px]" />
        <span className="text-xl  text-gray-600  font-medium mt-2">{genderCounts.others} Others</span>
      </div>
    </div>


  );
};

export default GenderSummary;
