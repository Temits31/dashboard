import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">

      <div className="text-xl font-bold text-gray-800">Dashboard - PJG</div>

      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <li><a href="#" className="hover:text-blue-500">Home</a></li>
        <li><a href="#" className="hover:text-blue-500">Employees</a></li>
        <li><a href="#" className="hover:text-blue-500">Reports</a></li>
        <li><a href="#" className="hover:text-blue-500">Import</a></li>
        <li><a href="#" className="hover:text-blue-500">Settings</a></li>
      </ul>

     
    </nav>
  );
};

export default NavBar;
