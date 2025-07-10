/* eslint-disable @typescript-eslint/no-explicit-any */

import { type UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'

export type FormData = Record<string, any>


export default function TemplateForm({ data,form,submit }: { data: FormData, form:UseFormReturn<FormData, any, FormData>, submit:(formData: FormData) => void }) {
  
  const renderFormField = (key: string, value: any, parentKey: string = '') => {
    const fieldId = parentKey ? `${parentKey}.${key}` : key
    const labelText = key.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')

    if (typeof value === 'object' && value !== null) {
      return (
        <div key={fieldId} className="space-y-2 border-l-2 border-gray-200 pl-4 my-4">
          <h3 className="font-medium text-sm text-gray-700">{labelText}</h3>
          {Object.entries(value).map(([nestedKey, nestedValue]) =>
            renderFormField(nestedKey, nestedValue, key)
          )}
        </div>
      )
    }

    if (typeof value === 'string') {
      if (key.includes('image') || key.includes('logo')) {
        return (
          <FormField
            key={fieldId}
            control={form.control}
            name={fieldId}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor={fieldId}>{labelText}</FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center">
                    <Input
                      id={fieldId}
                      type="file"
                      accept="image/*"
                      className="flex-1"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          field.onChange(URL.createObjectURL(file))
                        }
                      }}
                    />
                    {field.value && (
                      <img 
                        src={field.value} 
                        alt={labelText}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        )
      }

      return (
        <FormField
          key={fieldId}
          control={form.control}
          name={fieldId}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor={fieldId}>{labelText}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id={fieldId}
                  type="text"
                  placeholder={`Enter ${labelText}`}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )
    }

    return null
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="content-form space-y-4 p-4">
        {Object.entries(data).map(([key, value]) => renderFormField(key, value))}
      </form>
    </Form>
  )
}