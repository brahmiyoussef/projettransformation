import React from 'react';

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="bg-red-500 text-white p-4 rounded flex items-center justify-between mb-4">
      <span>{message}</span>
      <button onClick={onClose} className="text-lg font-bold">
        &times;
      </button>
    </div>
  );
};

export default CustomAlert;
