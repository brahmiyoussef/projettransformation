// TransformationPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import FileUploadForm from '../components/FileUploadForm';
import CustomAlert from '../components/CustomAlert';

const TransformationPage = () => {
  const [file, setFile] = useState(null);
  const [fromFormat, setFromFormat] = useState('xml');
  const [toFormat, setToFormat] = useState('json');
  const [result, setResult] = useState('');
  const [fileName, setFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConversion = async () => {
    if (!file) {
      setErrorMessage('Please select a file to convert.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`/api/convert/${fromFormat}/${toFormat}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
      setErrorMessage(''); // Clear any previous error message
    } catch (error) {
      console.error('Error during file conversion', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 500) {
          setErrorMessage('Server error during file conversion. Please try again later.');
        } else {
          setErrorMessage(`Error: ${error.response.statusText} (${error.response.status})`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage('Unexpected error occurred. Please try again.');
      }
    }
  };

  const handleExport = () => {
    if (!result) {
      setErrorMessage('No result to export');
      return;
    }

    let exportData = result;
    let exportFileName = fileName;

    if (typeof result === 'object') {
      exportData = JSON.stringify(result, null, 2);
    }

    if (!exportFileName) {
      exportFileName = `exported_file.${toFormat}`;
    } else {
      exportFileName += `.${toFormat}`;
    }

    const blob = new Blob([exportData], { type: 'application/octet-stream' });
    saveAs(blob, exportFileName);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">File Conversion</h1>

        {errorMessage && <CustomAlert message={errorMessage} onClose={() => setErrorMessage('')} />}

        <FileUploadForm
          handleFileChange={handleFileChange}
          fromFormat={fromFormat}
          setFromFormat={setFromFormat}
          toFormat={toFormat}
          setToFormat={setToFormat}
        />
        <button
          onClick={handleConversion}
          className="w-full bg-customColor text-white py-2 px-4 rounded hover:bg-secondaryColor transition duration-300"
        >
          Convert
        </button>
        {result && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-black">Result:</h2>
            <pre className="bg-gray-200 p-4 rounded overflow-auto">{typeof result === 'object' ? JSON.stringify(result, null, 2) : result}</pre>
            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleExport}
                className="bg-customColor text-white py-2 px-4 rounded hover:bg-secondaryColor transition duration-300"
              >
                Export
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransformationPage;
