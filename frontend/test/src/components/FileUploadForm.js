// FileUploadForm.js
import React from 'react';

const FileUploadForm = ({ handleFileChange, fromFormat, setFromFormat, toFormat, setToFormat }) => {
  return (
    <div className="mb-6">
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <div className="mb-6 flex items-center justify-between mt-4">
        <div>
          <label className="mr-2 font-medium text-black">From:</label>
          <select
            value={fromFormat}
            onChange={(e) => setFromFormat(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="xml">XML</option>
            <option value="json">JSON</option>
          </select>
        </div>
        <div>
          <label className="ml-4 mr-2 font-medium text-black">To:</label>
          <select
            value={toFormat}
            onChange={(e) => setToFormat(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="xml">XML</option>
            <option value="json">JSON</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FileUploadForm;
