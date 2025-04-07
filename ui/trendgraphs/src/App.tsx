import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Wizard from './components/wizard/Wizard';
import DashboardName from './components/wizard/DashboardName';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Wizard />} />
        <Route path="/dashboard-name" element={<DashboardName onNext={() => {}} onBack={() => {}} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
