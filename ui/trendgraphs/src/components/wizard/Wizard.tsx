import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfigSettings from './ConfigSettings';
import DashboardSelector from './DashboardSelector';
import DashboardName from './DashboardName';
import EmailSetup from './EmailSetup';
import './Wizard.css';

const Wizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleDashboardNameNext = () => {
    setCurrentStep(3);
  };

  const handleDashboardNameBack = () => {
    setCurrentStep(1);
  };

  const steps = [
    {
      title: 'Configuration Settings',
      component: <ConfigSettings onNext={() => setCurrentStep(1)} />
    },
    {
      title: 'Dashboard Selection',
      component: <DashboardSelector 
        onNext={() => navigate('/dashboard-name')} 
        onBack={() => setCurrentStep(0)} 
      />
    },
    {
      title: 'Dashboard Name',
      component: <DashboardName 
        onNext={handleDashboardNameNext} 
        onBack={handleDashboardNameBack} 
      />
    },
    {
      title: 'Email Setup',
      component: <EmailSetup 
        onBack={() => setCurrentStep(2)} 
        onFinish={() => console.log('Wizard completed')} 
      />
    }
  ];

  return (
    <div className="wizard-container">
      <div className="wizard-progress">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`progress-step ${index === currentStep ? 'active' : ''} 
                       ${index < currentStep ? 'completed' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>
      <div className="wizard-content-container">
        {steps[currentStep].component}
      </div>
    </div>
  );
};

export default Wizard; 