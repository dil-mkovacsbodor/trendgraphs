import * as React from "react"
import { cn } from "@/lib/utils"

interface Step {
  title: string
  description?: string
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
}

export function Stepper({ steps, currentStep, className, ...props }: StepperProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="flex justify-between relative w-full pb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "flex-1 relative z-10 bg-white px-4 text-center",
              index === currentStep && "active",
              index < currentStep && "completed"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 font-bold border-2 transition-colors duration-300 select-none",
                index === currentStep && "bg-primary text-white border-primary",
                index < currentStep && "bg-primary/20 text-primary border-primary",
                index > currentStep && "bg-white text-gray-600 border-gray-200"
              )}
            >
              {index + 1}
            </div>
            <div
              className={cn(
                "text-sm transition-colors duration-300 select-none",
                index === currentStep && "text-primary font-bold",
                index < currentStep && "text-primary/80 font-bold",
                index > currentStep && "text-gray-600"
              )}
            >
              {step.title}
            </div>
            {step.description && (
              <div className="text-xs text-gray-500 mt-1 select-none">{step.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}