// frontend/src/Components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExchangeAlt, FaHistory } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { AiOutlineLogout } from 'react-icons/ai';
import Logo from '../Assets/Logo_AWB.svg';

const Sidebar = () => {
  return (
    <div className="bg-customColor text-gray-800 h-full min-h-screen flex flex-col justify-between w-64 p-6 fixed top-0 left-0 shadow-lg">
      <div>
        <img src={Logo} alt="Logo" className="mb-6 w-40 mx-auto" />
        <ul className="space-y-6">
          <li className="flex items-center">
            <FaHome size={24} className="mr-3 text-gray-600" />
            <Link to="/" className="text-lg font-medium hover:text-secondaryColor transition-colors duration-200">
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <FaExchangeAlt size={24} className="mr-3 text-gray-600" />
            <Link to="/convert" className="text-lg font-medium hover:text-secondaryColor transition-colors duration-200">
              Convert
            </Link>
          </li>
          <li className="flex items-center">
            <FaHistory size={24} className="mr-3 text-gray-600" />
            <Link to="/history" className="text-lg font-medium hover:text-secondaryColor transition-colors duration-200">
              History
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="space-y-6">
          <li className="flex items-center">
            <MdAccountCircle size={24} className="mr-3 text-gray-600" />
            <Link to="/account" className="text-lg font-medium hover:text-secondaryColor transition-colors duration-200">
              Account
            </Link>
          </li>
          <li className="flex items-center">
            <AiOutlineLogout size={24} className="mr-3 text-gray-600" />
            <Link to="/logout" className="text-lg font-medium hover:text-secondaryColor transition-colors duration-200">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
