// HistoryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [output, setOutput] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(history.length / itemsPerPage);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/convert/history');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching file history', error);
      alert('Error fetching file history: ' + error.message);
    }
  };

  const fetchOutput = async (id) => {
    try {
      const response = await axios.get(`/api/convert/output/${id}`);
      setOutput(response.data);
    } catch (error) {
      console.error('Error fetching file output', error);
      alert('Error fetching file output: ' + error.message);
    }
  };

  // Calculate the indices for the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">File Upload History</h2>
        <table className="w-full text-left border-collapse mb-6">
          <thead>
            <tr>
              <th className="p-2 border-b">File Name</th>
              <th className="p-2 border-b">From Format</th>
              <th className="p-2 border-b">To Format</th>
              <th className="p-2 border-b">Uploaded At</th>
              <th className="p-2 border-b">Show Output</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((file) => (
              <tr key={file.id}>
                <td className="p-2 border-b text-center">{file.filename}</td>
                <td className="p-2 border-b text-center">{file.inputType}</td>
                <td className="p-2 border-b text-center">{file.outputType}</td>
                <td className="p-2 border-b text-center">
                  {new Date(file.timestamp).toLocaleString()}
                </td>
                <td className="p-2 border-b text-center">
                  <button onClick={() => fetchOutput(file.id)} className="bg-customColor text-white py-2 px-4 rounded hover:bg-secondaryColor transition duration-300">
                    Show Output
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {output && (
          <div className="bg-gray-200 p-4 rounded overflow-auto mb-6">
            <h3 className="text-xl font-bold mb-4 text-black">Output:</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(output, null, 2)}</pre>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default HistoryPage;
