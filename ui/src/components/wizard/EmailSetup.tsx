import React from 'react';
import {UseFormReturn} from "react-hook-form";
import {FormData} from "@/components/wizard/Wizard.tsx";

interface EmailSetupProps {
  form: UseFormReturn<FormData>;
  onBack: () => void;
  onFinish: () => void;
}

const EmailSetup: React.FC<EmailSetupProps> = ({ onBack, onFinish }) => {
  return (
    <div className="wizard-page">
      <h2>Email Setup</h2>
      <div className="wizard-content">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter your email address" />
        </div>
        <div className="form-group">
          <label htmlFor="notifications">Notification Preferences</label>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" id="daily" /> Daily Reports
            </label>
            <label>
              <input type="checkbox" id="weekly" /> Weekly Summaries
            </label>
            <label>
              <input type="checkbox" id="alerts" /> Alert Notifications
            </label>
          </div>
        </div>
        <div className="wizard-navigation">
          <button onClick={onBack} className="back-button">
            Back
          </button>
          <button onClick={onFinish} className="finish-button">
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailSetup; 