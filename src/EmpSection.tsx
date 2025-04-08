const EmpSection = () => {
  return (
    <div className="relative h-[1800px] w-screen mt-10 rounded-tl-[200px] px-10 rounded-br-[200px] overflow-hidden shadow-lg">
      {/* Background */}
      <img
        src="/circle3.svg"
        alt="Background"
        className="w-full h-full object-cover absolute inset-0 z-10"
      />

      <div className="relative z-20 h-full text-white p-10">
        <div className="text-4xl font-bold ml-20 mt-20">Employees</div>

        <div className="grid grid-cols-6 h-full pt-10 gap-6">
          <div className="col-span-2 flex flex-col justify-start">
            <div className="text-xl font-semibold text-center py-[10px]">
            <hr className="ml-[30%] w-screen pr-10"/>
            Plantilla Details</div>
            <div className="text-xl font-semibold text-center pt-[40%]">
            <hr className="ml-[30%] w-screen pr-10"/>
            Employment Details</div>
            <div className="text-xl font-semibold text-center pt-[100%]">
            <hr className="ml-[30%] w-screen pr-10"/>
            Personal Details</div>
            <div className="text-xl font-semibold text-center py-[85%]">
              <hr className="ml-[30%] w-screen pr-10"/>
              Appointment Details</div>
          </div>

          {/* Column 2: Placeholder */}
          <div className="col-span-2" />

          {/* Column 3: Input Fields */}
          <div className="col-span-2 space-y-6 text-black pt-6">
            {/* Dropdown */}
            <select
              name="item"
              id="item"
              className="w-full border rounded-md text-center py-2"
            >
              <option value="">Item 1</option>
              <option value="">Item 2</option>
              <option value="">Item 3</option>
            </select>

            {/* Grid Inputs */}
            <div className="grid grid-cols-2 gap-4 font-semibold">
              <input
                type="text"
                name="itemnum"
                className="border rounded-md text-center py-1"
                placeholder="Item No."
              />
              <input
                type="text"
                name="position"
                className="border rounded-md text-center py-1"
                placeholder="Position Title"
              />
              <input
                type="text"
                name="salaryGrade"
                className="border rounded-md text-center py-1"
                placeholder="Salary Grade"
              />
              <input
                type="text"
                name="step"
                className="border rounded-md text-center py-1"
                placeholder="Step"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 px-2">
              {["Option 1", "Option 2", "Option 3"].map((opt, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="itemChoice"
                    value={opt.toLowerCase()}
                    className="accent-blue-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 pt-4 font-semibold">
              <input
                type="text"
                name="empType"
                id="empType"
                placeholder="Employee Type"
                className="border rounded-md text-center  py-1"
              />
              <input
                type="text"
                name="authSal"
                id="authSal"
                placeholder="Authorized Salary"
                className="border rounded-md text-center  py-1"
              />
              <input
                type="text"
                name="actSal"
                id="actSal"
                placeholder="Actual Salary"
                className="border rounded-md text-center  py-1"
              />
              <input
                type="text"
                name="monSal"
                id="monSal"
                placeholder="Monthly Salary"
                className="border rounded-md text-center  py-1"
              />
              <input
                type="text"
                name="areaCode"
                id="areaCode"
                placeholder="Area Code"
                className="border rounded-md text-center  py-1"
              />
              <input
                type="text"
                name="areaType"
                id="areaType"
                placeholder="Area Type"
                className="border rounded-md text-center  py-1"
              />
               <input
                type="text"
                name="level"
                id="level"
                placeholder="Level"
                className="border rounded-md text-center  py-1"
              />
               <input
                type="text"
                name="attribution"
                id="attribution"
                placeholder="Attribution"
                className="border rounded-md text-center  py-1"
              />
               <input
                type="text"
                name="incumbent"
                id="incumbent"
                placeholder="Incumbent"
                className="border rounded-md text-center  py-1"
              />
              <input
                type="text"
                name="division"
                id="division"
                placeholder="Division"
                className="border rounded-md text-center  py-1"
              />
              <input
                type="text"
                name="department"
                id="department"
                placeholder="Department"
                className="border rounded-md text-center  py-1"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 pt-6 font-semibold">
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className="border rounded-md text-center   py-1"
              />
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                className="border rounded-md text-center  py-1"
              />
              <input
                type="text"
                name="middleName"
                id="middleName"
                placeholder="Middle Name"
                className="border rounded-md text-center  py-1"
              />
              <input
                type="text"
                name="sex"
                id="sex"
                placeholder="Sex"
                className="border rounded-md text-center  py-1"
              />
              <input
                type="text"
                name="birthdate"
                id="birthdate"
                placeholder="Birthdate"
                className="border rounded-md text-center  py-1"
              />
              <input
                type="text"
                name="age"
                id="age"
                placeholder="Age"
                className="border rounded-md text-center  py-1"
              />
               <input
                type="text"
                name="tin"
                id="tin"
                placeholder="Tin Number"
                className="border rounded-md text-center  py-1"
              />  
               <input
                type="text"
                name="attribution"
                id="attribution"
                placeholder="Attribution"
                className="border rounded-md text-center  py-1"
              />
               <input
                type="text"
                name="incumbent"
                id="incumbent"
                placeholder="Incumbent"
                className="border rounded-md text-center  py-1"
              />
              
            </div>
            <div className="grid grid-cols-1 gap-3 pt-4 font-semibold">
            <input
                type="text"
                name="origappointDate"
                id="origappointDate"
                placeholder="Original Appointment Date"
                className="border rounded-md text-center  py-1"
              />
              <input
                type="text"
                name="lastpromotionDate"
                id="department"
                placeholder="Last Promotion Date"
                className="border rounded-md text-center  py-1"
              />
               <input
                type="text"
                name="appointStat"
                id="appointStat"
                placeholder="Appointment Status"
                className="border rounded-md text-center  py-1"
              />
               <input
                type="text"
                name="csElig"
                id="csElig"
                placeholder="Civil Service Eligibility"
                className="border rounded-md text-center  py-1"
              />
              
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpSection;
