"use client"

import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";

interface FormData {
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

export function ConfigSettings() {
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

  return (
      <div className="flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-2 gap-12 px-6">
            {/* LEFT COLUMN FIELDS */}
            <div className="space-y-6 gap-2 flex flex-col">
              <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-3 text-1xl font-semibold">Company:</FormLabel>
                        <Input
                            type="text"
                            placeholder="Type your company name..."
                            onChange={field.onChange}
                            defaultValue={field.value}
                        />
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
                        <Select onValueChange={field.onChange} defaultValue={field.value} >
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
                        <Textarea
                            placeholder="Type your market insight objective here..."
                            onChange={field.onChange}
                            defaultValue={field.value}
                        />
                        <FormMessage />
                      </FormItem>
                  )}
              />
            </div>

            {/* FULL WIDTH SUBMIT BUTTON */}
            <div className="flex col-start-2 justify-end">
              <Button type="submit">Finish Config</Button>
            </div>
          </form>
        </Form>
      </div>

  )
}

export default ConfigSettings


// import React from 'react';
//
// interface ConfigSettingsProps {
//   onNext: () => void;
// }
//
// const ConfigSettings: React.FC<ConfigSettingsProps> = ({ onNext }) => {
//   return (
//     <div className="wizard-page">
//       <h2>Configuration Settings</h2>
//       <div className="wizard-content">
//         <div className="form-group">
//           <label htmlFor="apiKey">API Key</label>
//           <input type="text" id="apiKey" placeholder="Enter your API key" />
//         </div>
//         <div className="form-group">
//           <label htmlFor="projectName">Project Name</label>
//           <input type="text" id="projectName" placeholder="Enter project name" />
//         </div>
//         <div className="wizard-navigation">
//           <button onClick={onNext} className="next-button">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default ConfigSettings;