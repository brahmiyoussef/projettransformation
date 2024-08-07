import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import SideBar from './components/SideBar';
import Home from './Features/HomePage';
import Convert from './Features/TransformationPage';
import History from './Features/HistoryPage';
import Login from './Features/LoginPage';
import Logout from './Features/Logout';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AuthWrapper />
        </div>
      </Router>
    </AuthProvider>
  );
};

const AuthWrapper = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <div className="content-wrapper">
          <SideBar className="sidebar" />
          <div className="content">
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/convert" element={<Convert />} />
              <Route path="/history" element={<History />} />
              <Route path="/logout" element={<Logout />} />

            </Routes>
          </div>
        </div>
      ) : (
        <div className="content-wrapper">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
