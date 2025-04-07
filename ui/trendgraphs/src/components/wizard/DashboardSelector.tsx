import React from 'react';

interface DashboardSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

const DashboardSelector: React.FC<DashboardSelectorProps> = ({ onNext, onBack }) => {
  return (
    <div className="wizard-page">
      <h2>Select Dashboard</h2>
      <div className="wizard-content">
        <div className="form-group">
          <label>Choose Dashboard Type</label>
          <select className="dashboard-select">
            <option value="">Select a dashboard type</option>
            <option value="analytics">Analytics Dashboard</option>
            <option value="monitoring">Monitoring Dashboard</option>
            <option value="custom">Custom Dashboard</option>
          </select>
        </div>
        <div className="wizard-navigation">
          <button onClick={onBack} className="back-button">
            Back
          </button>
          <button onClick={onNext} className="next-button">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSelector; 