import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { FormValues } from '@/lib/schema/form.schema'

interface TagInputProps {
  form: UseFormReturn<FormValues>
  name: 'competitors' | 'partners'
  label: string
  placeholder: string
}

export function TagInput({ form, name, label, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      const currentTags = form.getValues(name) || []
      if (!currentTags.includes(inputValue.trim())) {
        const newTags = [...currentTags, inputValue.trim()]
        form.setValue(name, newTags, { shouldValidate: true })
      }
      setInputValue('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues(name) || []
    const newTags = currentTags.filter((tag: string) => tag !== tagToRemove)
    form.setValue(name, newTags, { shouldValidate: true })
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-gray-700">{label}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <Input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={fieldState.error ? "mt-1 mb-0 border-destructive" : "mt-1 mb-0"}
                aria-invalid={!!fieldState.error}
              />
              <div className="flex flex-wrap gap-2 mt-1">
                {field.value?.map((tag: string) => (
                  <div key={tag} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-sm">
                    <span>{tag}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
