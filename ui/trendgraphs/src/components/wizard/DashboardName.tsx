import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

interface DashboardNameProps {
  onNext?: () => void;
  onBack?: () => void;
}

const DashboardName: React.FC<DashboardNameProps> = ({ onNext, onBack }) => {
  const [dashboardName, setDashboardName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (!dashboardName.trim()) {
      setError('Please enter a dashboard name');
      return;
    }

    if (onNext) {
      onNext();
    } else {
      // If used as a standalone page, navigate to the next step
      navigate('/');
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // If used as a standalone page, navigate back
      navigate('/');
    }
  };

  return (
    <div className="wizard-page">
      <h2>Dashboard Name</h2>
      <div className="wizard-content">
        <div className="form-group">
          <label htmlFor="dashboardName">Dashboard Name</label>
          <input
            type="text"
            id="dashboardName"
            value={dashboardName}
            onChange={(e) => {
              setDashboardName(e.target.value);
              setError('');
            }}
            placeholder="Enter dashboard name"
          />
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="wizard-navigation">
          <button onClick={handleBack} className="back-button">
            Back
          </button>
          <button onClick={handleNext} className="next-button">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardName;