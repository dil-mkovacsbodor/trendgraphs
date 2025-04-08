import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { UseFormReturn } from 'react-hook-form'
import type { FormValues } from '@/lib/schema/form.schema'
import { TagInput } from './tag-input'
import { DateRangePicker } from './date-range-picker'

interface ConfigSettingsProps {
  form: UseFormReturn<FormValues>
  onNext: () => void
}

export function ConfigSettings({ form, onNext }: ConfigSettingsProps) {
  const handleNext = () => {
    form.trigger(['company', 'region', 'focus', 'industry', 'marketInsight', 'competitors', 'partners', 'timeframe']).then(isValid => {
      if (isValid) {
        onNext()
      }
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company and Region */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Company</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your company name" {...field} className="mt-1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Region</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="north_america">North America</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="africa">Africa</SelectItem>
                    <SelectItem value="latin_america">Latin America</SelectItem>
                    <SelectItem value="middle_east">Middle East</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Focus and Industry */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="focus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Main Focus/Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Select focus/category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="product_development">Product Development</SelectItem>
                    <SelectItem value="sales_and_marketing">Sales & Marketing</SelectItem>
                    <SelectItem value="research_and_innovation">Research & Innovation</SelectItem>
                    <SelectItem value="customer_support">Customer Support</SelectItem>
                    <SelectItem value="operations_and_logistics">Operations & Logistics</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Industry</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Competitors and Partners */}
        <div className="space-y-6">
          <TagInput
            form={form}
            name="competitors"
            label="Competitors"
            placeholder="Enter competitor name and press Enter"
          />
          <TagInput
            form={form}
            name="partners"
            label="Partners"
            placeholder="Enter partner name and press Enter"
          />
        </div>

        {/* Timeframe and Market Insight */}
        <div className="space-y-6">
          <DateRangePicker
            form={form}
            name="timeframe"
            label="Timeframe"
          />
          <FormField
            control={form.control}
            name="marketInsight"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Market Insight Objective</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your market insight objective..."
                    {...field}
                    className="mt-1 min-h-[200px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="mt-8 flex justify-end">
        <Button type="button" onClick={handleNext} className="px-6 py-2">
          Next
        </Button>
      </div>
    </div>
  )
}

export default ConfigSettings
