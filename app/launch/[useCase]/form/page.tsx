"use client"

import { use } from "react"
import { ScriptForm } from "@/components/onboarding/script-form"

export default function FormPage({ params }: { params: Promise<{ useCase: string }> }) {
  const resolvedParams = use(params)
  const { useCase } = resolvedParams

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ScriptForm useCase={useCase} />
    </div>
  )
}

