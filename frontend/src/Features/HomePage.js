import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import 'C:\\Users\\y.brahmi\\Desktop\\projettranformation\\frontend\\src\\App.css'; // Import the CSS file
import jsyaml from 'js-yaml';

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [fromFormat, setFromFormat] = useState('xml');
  const [toFormat, setToFormat] = useState('yaml'); // Initialize to YAML for default export option
  const [result, setResult] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConversion = async () => {
    if (!file) {
      alert('Please select a file');
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
    } catch (error) {
      console.error('Error during file conversion', error);
      alert('Error during file conversion: ' + error.message);
    }
  };

  const handleExport = () => {
    if (!result) {
      alert('No result to export');
      return;
    }

    let exportData = result;
    let exportFileName = fileName;

    // Convert result to string if it's an object (for JSON and YAML)
    if (typeof result === 'object') {
      if (toFormat === 'json') {
        exportData = JSON.stringify(result, null, 2);
        exportFileName += '.json';
      } else if (toFormat === 'yaml') {
        // Convert JS object to YAML string
        exportData = jsyaml.dump(result); // Assuming you have imported jsyaml library
        exportFileName += '.yaml';
      }
    }

    // If no file name specified, use a default name based on the format
    if (!exportFileName) {
      exportFileName = `exported_file.${toFormat}`;
    }

    const blob = new Blob([exportData], { type: 'application/octet-stream' });
    saveAs(blob, exportFileName);
  };

  return (
    <div className="App">
      <h1>File Conversion</h1>
      <input type="file" onChange={handleFileChange} />
      <div>
        <label>From: </label>
        <select value={fromFormat} onChange={(e) => setFromFormat(e.target.value)}>
          <option value="xml">XML</option>
          <option value="json">JSON</option>
          <option value="yaml">YAML</option> {/* Add YAML option */}
        </select>
        <label>To: </label>
        <select value={toFormat} onChange={(e) => setToFormat(e.target.value)}>
          <option value="xml">XML</option>
          <option value="json">JSON</option>
          <option value="yaml">YAML</option> {/* Add YAML option */}
        </select>
      </div>
      <button onClick={handleConversion}>Convert</button>
      {result && (
        <div>
          <h2>Result:</h2>
          <pre>{typeof result === 'object' ? JSON.stringify(result, null, 2) : result}</pre>
          <input
            type="text"
            placeholder="Enter file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <button onClick={handleExport}>Export</button>
        </div>
      )}
      {/* Add navigation link to HistoryPage */}
      <div>
        <Link to="/history">Go to History Page</Link>
      </div>
    </div>
  );
};

export default HomePage;
