// frontend/src/Components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExchangeAlt, FaHistory } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { AiOutlineLogout } from 'react-icons/ai';
import Logo from '../Assets/Logo_AWB.svg';

const Sidebar = () => {
  return (
    <div className="bg-customColor text-white h-full min-h-screen flex flex-col justify-between w-64 p-6">
      <div>
        <img src={Logo} alt="Logo" className="mb-6 w-50 mx-auto" />
        <ul className="space-y-4">
          <li className="flex items-center">
            <FaHome size={20} className="mr-2 text-black" />
            <Link to="/" className="text-lg hover:bg-secondaryColor p-4 block rounded text-black">Home</Link>
          </li>
          <li className="flex items-center">
            <FaExchangeAlt size={20} className="mr-2 text-black" />
            <Link to="/convert" className="text-lg hover:bg-secondaryColor p-4 block rounded text-black">Convert</Link>
          </li>
          <li className="flex items-center">
            <FaHistory size={20} className="mr-2 text-black" />
            <Link to="/history" className="text-lg hover:bg-secondaryColor p-4 block rounded text-black">History</Link>
          </li>
        </ul>
      </div>
      <div className="mt-auto">
        <ul className="space-y-4">
          <li className="flex items-center">
            <MdAccountCircle size={20} className="mr-2 text-black" />
            <Link to="/account" className="text-lg hover:bg-secondaryColor p-4 block rounded text-black">Account</Link>
          </li>
          <li className="flex items-center">
            <AiOutlineLogout size={20} className="mr-2 text-black" />
            <Link to="/logout" className="text-lg hover:bg-secondaryColor p-4 block rounded text-black">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
