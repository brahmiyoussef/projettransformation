// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Features/HomePage';
import ConvertPage from './Features/TransforationPage';
import HistoryPage from './Features/HistoryPage';
import Sidebar from './components/Sidebar';
import './index.css'; // Import the Tailwind CSS file

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-grow p-4 bg-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/convert" element={<ConvertPage />} />
            <Route path="/history" element={<HistoryPage />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
