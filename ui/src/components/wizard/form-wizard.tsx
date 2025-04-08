import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfigSettings from './config-settings'
import { DashboardSelector } from './dashboard-selector'
import EmailSetup from './email-setup'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Stepper } from '@/components/ui/stepper'
import type { FormValues, QueryPayload } from '@/lib/schema/form.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from '@/lib/schema/form.schema'

const mockPayload: QueryPayload = {
  company: 'Tesla',
  region: 'North America',
  focus: 'Electric Vehicles',
  industry: 'Automotive',
  marketInsight: 'Growing demand for sustainable transportation',
  dashboardType: 'Competitive Analysis',
  competitors: ['Ford', 'General Motors', 'Toyota', 'Volkswagen', 'Rivian'],
  partners: ['Panasonic', 'CATL', 'LG Energy Solution', 'Mobileye'],
  timeframe: ['2023-06-01T00:00:00Z', '2023-06-08T00:00:00Z'],
}

const defaultFormData: FormValues = {
  company: '',
  region: '',
  focus: '',
  industry: '',
  marketInsight: '',
  dashboardType: '',
  competitors: [],
  partners: [],
  timeframe: undefined,
}

export const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()

  const form = useForm<FormValues>({
    defaultValues: defaultFormData,
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  function onSubmit(data: FormValues) {
    if (!data.timeframe) return

    const apiPayload: QueryPayload = {
      ...data,
      timeframe: [data.timeframe.from.toISOString(), data.timeframe.to.toISOString()],
    }

    console.log('API Payload:', apiPayload)
    const toastId = toast('Success', {
      description: 'Your configuration has been saved',
      action: {
        label: 'Close',
        onClick: () => toast.dismiss(toastId),
      },
    })
  }

  const steps = [
    {
      title: 'Configuration',
      description: 'Basic company information',
      component: <ConfigSettings form={form} onNext={() => setCurrentStep(1)} />,
    },
    {
      title: 'Dashboard Selection',
      description: 'Choose your dashboard type',
      component: <DashboardSelector form={form} onNext={() => setCurrentStep(2)} onBack={() => setCurrentStep(0)} />,
    },
    {
      title: 'Email Setup',
      description: 'Configure email notifications',
      component: <EmailSetup form={form} onBack={() => navigate('/dashboard-name')} onFinish={() => {}} />,
    },
  ]

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-w-3xl mx-auto my-8 p-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="flex justify-center py-8">{steps[currentStep].component}</div>
        </div>
      </form>
    </FormProvider>
  )
}
