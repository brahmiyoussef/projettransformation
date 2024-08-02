// frontend/src/Features/HistoryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Correct path to the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [output, setOutput] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleBackClick = () => {
    navigate('/'); // Navigate to the homepage
  };

  return (
    <div>
      <button onClick={handleBackClick} style={{ margin: '10px', padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
        Back to Home
      </button>
      <h2>File Upload History:</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>File Name</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>From Format</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>To Format</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>Uploaded At</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>Show Output</th>
          </tr>
        </thead>
        <tbody>
          {history.map((file) => (
            <tr key={file.id}>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{file.filename}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{file.inputType}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{file.outputType}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                {new Date(file.timestamp).toLocaleString()}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                <button onClick={() => fetchOutput(file.id)}>Show Output</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {output && (
        <div>
          <h3>Output:</h3>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
