// frontend/src/Features/HistoryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [output, setOutput] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/history'); // Updated URL
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching file history', error);
      alert('Error fetching file history: ' + error.message);
    }
  };

  const fetchOutput = async (id) => {
    try {
      const response = await axios.get(`/api/transform/output/${id}`); // Updated URL
      setOutput(response.data);
    } catch (error) {
      console.error('Error fetching file output', error);
      alert('Error fetching file output: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">File Upload History</h2>
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300 font-normal">File Name</th>
              <th className="p-2 border border-gray-300 font-normal">From Format</th>
              <th className="p-2 border border-gray-300 font-normal">To Format</th>
              <th className="p-2 border border-gray-300 font-normal">Uploaded At</th>
              <th className="p-2 border border-gray-300 font-normal">Show Output</th>
            </tr>
          </thead>
          <tbody>
            {history.map((file) => (
              <tr key={file.id}>
                <td className="p-2 border border-gray-300 text-center">{file.filename}</td>
                <td className="p-2 border border-gray-300 text-center">{file.inputType}</td>
                <td className="p-2 border border-gray-300 text-center">{file.outputType}</td>
                <td className="p-2 border border-gray-300 text-center">
                  {new Date(file.timestamp).toLocaleString()}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <button onClick={() => fetchOutput(file.id)} className="bg-customColor text-white py-2 px-4 rounded hover:bg-secondaryColor transition duration-300">
                    Show Output
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {output && (
          <div className="bg-gray-200 p-4 rounded overflow-auto">
            <h3 className="text-xl font-bold mb-4 text-black">Output:</h3>
            <pre>{JSON.stringify(output, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
