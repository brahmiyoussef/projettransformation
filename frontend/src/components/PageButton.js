// PageButton.js
import React from 'react';

const PageButton = ({ label, onClick, disabled, active }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
        active ? ' bg-secondaryColor text-white' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {label}
    </button>
  );
};

export default PageButton;
