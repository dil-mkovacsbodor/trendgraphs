import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Wizard from './components/wizard/Wizard';
import DashboardName from './components/wizard/DashboardName';
import {Toaster} from "sonner";

function App() {
    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<Wizard />} />
                <Route path="/dashboard-name" element={<DashboardName onNext={() => {}} onBack={() => {}} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster position="top-right"/>
        </div>
    );
}

export default App;