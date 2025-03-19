import { ScriptForm } from "@/components/onboarding/script-form"

interface FormPageProps {
  params: Promise<{ useCase: string }> | { useCase: string }
}

  export default async function FormPage({ params }: FormPageProps) {
  const resolvedParams = await params
  const { useCase } = resolvedParams

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ScriptForm useCase={useCase} />
    </div>
  )
}

