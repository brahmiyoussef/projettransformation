import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import ProtectedPage from './ProtectedPage';
import Dashboard from './Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Routes>
            <Route path="/login" element={<App />} />
            <Route path="/protected" element={<ProtectedPage />} />
            <Route path="/home" element={<Dashboard />} />
        </Routes>
    </Router>
);
