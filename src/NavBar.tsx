import { useEffect, useState } from "react";

const NavBar = () => {




  return (
    <>
    <header className="">
      <nav className="  flex justify-between items-center fixed  w-[100%] mx-auto bg-[#1F4529] shadow-md p-4 px-[90px] py-[24px] z-50">
        <div className="text-xl font-bold text-[#EFE3C2]">Dashboard - PJG</div>

        <ul className="hidden md:flex space-x-20 text-[#EFE3C2] font-medium">
          <li>
            <a href="/EmployeeCard" className="hover:text-[#EFE3C2]">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/EmpSection" className="hover:text-[#EFE3C2]">
              Employees
            </a>
          </li>
          <li>
            <a href="/Reports" className="hover:text-[#EFE3C2]">
              Reports
            </a>
          </li>
          <li>
            <a href="/Import" className="hover:text-[#EFE3C2]">
              Import
            </a>
          </li>
          <li>
            <a href="/Settings" className="hover:text-[#EFE3C2]">
              Settings
            </a>
          </li>
        </ul>
        
      </nav>
     
    </header>
    
     </>
   
  );
};

export default NavBar;
