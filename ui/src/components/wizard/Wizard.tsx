import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ConfigSettings from './ConfigSettings';
import DashboardSelector from './DashboardSelector';
import EmailSetup from './EmailSetup';
import {FormProvider, useForm} from "react-hook-form";
import {toast} from "sonner";
import { cn } from "@/lib/utils";

export interface FormData {
  company: string
  region: string
  focus: string
  industry: string
  marketInsight: string
  dashboardType: string
  competitors: string[],
  partners: string[],
  timeframe: string[]
}

const defaultFormData: FormData = {
  company: "",
  region: "",
  focus: "",
  industry: "",
  marketInsight: "",
  dashboardType: "",
  competitors: [],
  partners: [],
  timeframe: [],
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

  const steps = [
    {
      title: 'Configuration',
      component: <ConfigSettings form={form} onNext={() => setCurrentStep(1)} />
    },
    {
      title: 'Dashboard Selection',
      component: <DashboardSelector
          form={form}
          onNext={() => setCurrentStep(2)}
          onBack={() => setCurrentStep(0)}
      />
    },
    {
      title: 'Email Setup',
      component: <EmailSetup
          form={form}
          onBack={() => navigate('/dashboard-name')}
          onFinish={() => {}}
      />
    }
  ];

  return (
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-w-3xl mx-auto my-8 p-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between relative w-full pb-8 border-b-2 border-gray-200">
              {steps.map((step, index) => (
                  <div
                      key={index}
                      className={cn(
                        "flex-1 relative z-10 bg-white px-4 text-center",
                        index === currentStep && "active",
                        index < currentStep && "completed"
                      )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 font-bold",
                      index === currentStep && "bg-primary text-white",
                      index < currentStep && "bg-primary/20 text-primary",
                      index > currentStep && "bg-gray-200 text-gray-600"
                    )}>
                      {index + 1}
                    </div>
                    <div className={cn(
                      "text-sm",
                      index === currentStep && "text-primary font-bold",
                      index < currentStep && "text-primary/80 font-bold",
                      index > currentStep && "text-gray-600"
                    )}>
                      {step.title}
                    </div>
                  </div>
              ))}
            </div>
            <div className="flex justify-center py-8">
              {steps[currentStep].component}
            </div>
          </div>
        </form>
      </FormProvider>
  );
};

export default Wizard;