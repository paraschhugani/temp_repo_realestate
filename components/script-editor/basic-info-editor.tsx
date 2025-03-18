"use client"

import { ScriptField } from "./script-field"

interface ScriptFieldType {
  id: string
  label?: string
  question: string
  type: string
  placeholder: string
  category?: string
  required?: boolean
  description?: string
  value?: string
}

interface BasicInfoEditorProps {
  basicFields: ScriptFieldType[]
  values: Record<string, string>
  onChange: (id: string, value: string) => void
}

export function BasicInfoEditor({ basicFields, values, onChange }: BasicInfoEditorProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-2">
        <p className="text-base text-gray-500">Configure the core elements of your script.</p>
      
      </div>

      <div className="grid grid-cols-1 gap-2">
        {basicFields.map((field) => (
          <ScriptField
            key={field.id}
            field={{
              ...field,
              description: field.required ? "" : undefined
            }}
            value={values[field.id] || ""}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}

