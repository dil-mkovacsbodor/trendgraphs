import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { UseFormReturn } from 'react-hook-form'
import type { FormValues } from '@/lib/types/form'

interface ConfigSettingsProps {
  form: UseFormReturn<FormValues>
  onNext: () => void
}

export function ConfigSettings({ form, onNext }: ConfigSettingsProps) {
  return (
    <div className="w-full grid grid-cols-2 gap-12 px-12">
      {/* LEFT COLUMN FIELDS */}
      <div className="space-y-6 gap-2 flex flex-col">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-3 text-1xl font-semibold">Company:</FormLabel>
              <Input type="text" placeholder="Type your company name..." {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-3 text-1xl font-semibold">Region:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
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
        <FormField
          control={form.control}
          name="focus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-3 text-1xl font-semibold">Main focus/category:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
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
              <FormLabel className="pb-3 text-1xl font-bold">Industry:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
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

      {/* RIGHT COLUMN - Market Insight */}
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="marketInsight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-3 text-1xl font-bold">Market Insight Objective:</FormLabel>
              <Textarea placeholder="Type your market insight objective here..." {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* FULL WIDTH SUBMIT BUTTON */}
      <div className="flex col-start-2 justify-end">
        <Button type="button" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default ConfigSettings
