import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import type { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import type { FormValues } from '@/lib/schema/form.schema'

interface DateRangePickerProps {
  form: UseFormReturn<FormValues>
  name: 'timeframe'
  label: string
}

export function DateRangePicker({ form, name, label }: DateRangePickerProps) {
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    // Create date in UTC
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate;
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-sm font-medium text-gray-700">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full mt-1 pl-3 text-left font-normal rounded-lg',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, 'dd/MM/yyyy')} -{' '}
                        {format(field.value.to, 'dd/MM/yyyy')}
                      </>
                    ) : (
                      format(field.value.from, 'dd/MM/yyyy')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={field.value?.from}
                selected={field.value}
                onSelect={(range) => {
                  if (range?.from) {
                    const from = handleDateSelect(range.from);
                    const to = range.to ? handleDateSelect(range.to) : undefined;
                    field.onChange({ from, to });
                  } else {
                    field.onChange(undefined);
                  }
                }}
                numberOfMonths={2}
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}