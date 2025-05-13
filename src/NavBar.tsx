import React from 'react';

const NavBar = () => {
  return (
    <header className="">
<nav className=" flex justify-between items-center fixed w-[100%] mx-auto bg-white shadow-md p-4 px-[90px] py-[24px] z-50">

<div className="text-xl font-bold text-[#32A363]">Dashboard - PJG</div>

<ul className="hidden md:flex space-x-20 text-black font-medium">
  <li><a href="/EmployeeCard" className="hover:text-[#32A363]">Dashboard</a></li>
  <li><a href="/EmpSection" className="hover:text-[#32A363]">Employees</a></li>
  <li><a href="/Reports" className="hover:text-[#32A363]">Reports</a></li>
  <li><a href="/Import" className="hover:text-[#32A363]">Import</a></li>
  <li><a href="#" className="hover:text-[#32A363]">Settings</a></li>
</ul>


</nav>
    </header>
    
  );
};

export default NavBar;
