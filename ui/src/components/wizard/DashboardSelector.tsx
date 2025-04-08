import type { FormValues } from '@/lib/types/form'
import { Building2, Laptop, Leaf, LineChart, Scale, UserCheck, Users, UserSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { UseFormReturn } from 'react-hook-form'

interface DashboardSelectorProps {
  form: UseFormReturn<FormValues>
  onNext: () => void
  onBack: () => void
}

export const DashboardSelector = ({ form, onNext, onBack }: DashboardSelectorProps) => {
  const handleCardClick = (dashboardType: string) => {
    form.setValue('dashboardType', dashboardType)
    onNext()
  }

  const pestleCategories = [
    {
      name: 'Political',
      icon: Building2,
      bgColor: 'bg-red-100',
    },
    {
      name: 'Economic',
      icon: LineChart,
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Social',
      icon: Users,
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Technological',
      icon: Laptop,
      bgColor: 'bg-cyan-100',
    },
    {
      name: 'Legal',
      icon: Scale,
      bgColor: 'bg-amber-100',
    },
    {
      name: 'Environmental',
      icon: Leaf,
      bgColor: 'bg-emerald-100',
    },
  ]

  const riskCategories = [
    {
      name: 'Competitors',
      icon: UserSearch,
      bgColor: 'bg-orange-100',
    },
    {
      name: 'Clients',
      icon: UserCheck,
      bgColor: 'bg-indigo-100',
    },
    {
      name: 'Legal',
      icon: Scale,
      bgColor: 'bg-pink-100',
    },
    {
      name: 'Technology',
      icon: Laptop,
      bgColor: 'bg-teal-100',
    },
  ]

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-2xl font-semibold mb-6 text-center tracking-wider">Select dashboard type</h1>
      </div>
      <div className="mx-auto flex gap-8 items-stretch pb-12">
        <div className="flex-1 h-full">
          <h2 className="text-lg mb-4 text-center tracking-wide font-semibold">PESTLE</h2>

          <div
            className="h-full border rounded-lg p-6 shadow-sm bg-white cursor-pointer hover:ring-1 hover:ring-ring hover:bg-green-50 hover:border-transparent transition-all duration-200"
            onClick={() => handleCardClick('pestle')}
          >
            <div className="grid grid-cols-2 gap-6">
              {pestleCategories.map(category => (
                <div key={category.name}>
                  <div className="flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-lg ${category.bgColor} flex items-center justify-center m-2`}>
                      <category.icon size={40} className="text-gray-700" />
                    </div>
                    <span className="font-bold text-gray-700">{category.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 h-full">
          <h2 className="text-lg mb-4 text-center tracking-wide font-semibold">Risk Probability</h2>
          <div
            className="h-full border rounded-lg p-6 shadow-sm bg-white cursor-pointer hover:ring-1 hover:ring-ring hover:bg-green-50 hover:border-transparent transition-all duration-200"
            onClick={() => handleCardClick('riskProbability')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {riskCategories.map(category => (
                <div key={category.name}>
                  <div className="flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-lg ${category.bgColor} flex items-center justify-center m-2`}>
                      <category.icon size={40} className="text-gray-700" />
                    </div>
                    <span className="font-bold text-gray-700">{category.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>

        <Button type="button" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  )
}
