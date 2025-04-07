import React from 'react';

interface ConfigSettingsProps {
  onNext: () => void;
}

const ConfigSettings: React.FC<ConfigSettingsProps> = ({ onNext }) => {
  return (
    <div className="wizard-page">
      <h2>Configuration Settings</h2>
      <div className="wizard-content">
        <div className="form-group">
          <label htmlFor="apiKey">API Key</label>
          <input type="text" id="apiKey" placeholder="Enter your API key" />
        </div>
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input type="text" id="projectName" placeholder="Enter project name" />
        </div>
        <div className="wizard-navigation">
          <button onClick={onNext} className="next-button">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigSettings; 