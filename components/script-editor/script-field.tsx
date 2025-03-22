"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface ScriptFieldProps {
  field: {
    id: string
    label?: string
    question: string
    type: string
    placeholder: string
    description?: string
    required?: boolean
    value?: string
  }
  value: string
  onChange: (id: string, value: string) => void
  className?: string
}

export function ScriptField({ field, value, onChange, className = "" }: ScriptFieldProps) {

  return (
    <div className={cn("mb-6", className)}>
      <div className="space-y-3">
        {field.label && (
          <label 
            htmlFor={field.id} 
            className="block text-base font-semibold text-gray-900"
          >
            {field.label}
            {field.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        
        {!field.label && field.question && (
          <label 
            htmlFor={field.id} 
            className="block text-base font-medium text-gray-800"
          >
            {field.question}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {field.description && (
          <p className="text-sm text-gray-600 mt-1">
            {field.description}
          </p>
        )}
        
        {field.type === "textarea" ? (
          <Textarea
            id={field.id}
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full resize-y min-h-[160px] text-base p-4 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            rows={6}
          />
        ) : (
          <Input
            id={field.id}
            type="text"
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full h-12 text-base px-4 focus:border-gray-400 focus:ring-gray-400"
          />
        )}
      </div>
    </div>
  )
}

