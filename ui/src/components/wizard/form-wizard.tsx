import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfigSettings from './config-settings'
import { DashboardSelector } from './dashboard-selector'
import EmailSetup from './email-setup'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Stepper } from '@/components/ui/stepper'
import type { FormValues } from '@/lib/types/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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

const formSchema = z.object({
  company: z.string().min(1),
  region: z.string().min(1),
  focus: z.string().min(1),
  industry: z.string().min(1),
  marketInsight: z.string().min(1),
  dashboardType: z.string().min(1),
  competitors: z.array(z.string()).min(1),
  partners: z.array(z.string()).min(1),
  timeframe: z.object({
    from: z.date(),
    to: z.date().optional(),
  }).optional().refine((data) => {
    if (data?.to) {
      return data.to >= data.from
    }
    return true
  }, {
    message: "End date must be after start date",
    path: ["to"],
  }),
})

export const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()

  const form = useForm<FormValues>({
    defaultValues: defaultFormData,
    resolver: zodResolver(formSchema),
  })

  function onSubmit(data: FormValues) {
    console.log('Form data:', data)
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
