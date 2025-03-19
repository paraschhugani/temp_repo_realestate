"use client"
import { ScriptForm } from "@/components/onboarding/script-form"
import { useParams } from "next/navigation";



  export default function FormPage() {
    const params = useParams();
    const useCase = params.useCase as string;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ScriptForm useCase={useCase} />
    </div>
  )
}

