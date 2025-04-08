import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ConfigSettings from './ConfigSettings';
import DashboardSelector from './DashboardSelector';
import EmailSetup from './EmailSetup';
import './Wizard.css';
import {FormProvider, useForm} from "react-hook-form";
import {toast} from "sonner";

export interface FormData {
  company: string
  region: string
  focus: string
  industry: string
  marketInsight: string
}

const defaultFormData: FormData = {
  company: "",
  region: "",
  focus: "",
  industry: "",
  marketInsight: "",
}

const Wizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const form = useForm<FormData>({
    defaultValues : defaultFormData
  })

  function onSubmit(data: FormData) {
    console.log("Form data:", data)
    const toastId = toast("Success", {
      description: "Your configuration has been saved",
      action: {
        label: "Close",
        onClick: () => toast.dismiss(toastId),
      },
    })
  }

  const handleDashboardNameNext = () => {
    setCurrentStep(3);
  };

  const handleDashboardNameBack = () => {
    setCurrentStep(1);
  };

  const steps = [
    {
      title: 'Configuration Settings',
      component: <ConfigSettings form={form} onNext={() => setCurrentStep(1)} />
    },
    {
      title: 'Dashboard Selection',
      component: <DashboardSelector 
        onNext={() => navigate('/dashboard-name')} 
        onBack={() => setCurrentStep(0)} 
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
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="wizard-container bg-card border border-[oklch(0.9_0_0)]">
            <div className="wizard-progress border-b-2 border-[oklch(0.9_0_0)] pb-8">
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
            <div className="wizard-content-container flex justify-center">
              {steps[currentStep].component}
            </div>
          </div>
        </form>
      </FormProvider>
  );
};

export default Wizard; 