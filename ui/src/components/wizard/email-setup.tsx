import React from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { FormValues } from '@/lib/schema/form.schema'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface EmailSetupProps {
  form: UseFormReturn<FormValues>
  onBack: () => void
  onFinish: () => void
}

const EmailSetup: React.FC<EmailSetupProps> = ({ form, onBack, onFinish }) => {
  return (
    <div className="wizard-page">
      <h1 className="text-4xl font-bold mb-6 text-center py-6">Thank you!</h1>

      <Card className="w-full max-w-md mb-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Final Report</h2>
          <p className="text-muted-foreground">
            Your report is being generated. You’ll be notified when it’s ready to view.
          </p>
        </CardContent>
      </Card>
      <div className="px-12 py-6">
        <Button className="w-full text-lg mt-4" onClick={onFinish}>
          Subscribe
        </Button>
      </div>
    </div>
  )
}

export default EmailSetup
