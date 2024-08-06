// App.js
import React from 'react';
import SideBar from './components/SideBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Features/HomePage';
import Convert from './Features/TransformationPage';
import History from './Features/HistoryPage';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="App">
        <SideBar className="sidebar" />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/convert" element={<Convert />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
