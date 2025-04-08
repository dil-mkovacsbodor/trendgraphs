import React from 'react';
import {UseFormReturn} from "react-hook-form";
import {FormValues} from "@/components/wizard/Wizard.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

interface EmailSetupProps {
  form: UseFormReturn<FormValues>;
  onBack: () => void;
  onFinish: () => void;
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
      <p className="mb-4 text-sm text-muted-foreground py-6">
        You'll receive your dashboard when it's ready
      </p>
      <div className="px-12 py-6">
      <Button className="w-full text-lg" onClick={onFinish}>Subscribe</Button>
      </div>
    </div>


  );
};

export default EmailSetup;