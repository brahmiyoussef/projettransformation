// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Features/HomePage';
import HistoryPage from './Features/HistoryPage';
import 'C:\\Users\\y.brahmi\\Desktop\\projettranformation\\frontend\\src\\App.css';
 // Import the CSS file
function App() {
return (
<Router>
<div className="App">
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/history" element={<HistoryPage />} />
</Routes>
</div>
</Router>
);
}
export default App;
 