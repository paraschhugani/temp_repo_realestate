import { use } from "react"
import { IntegrationStep } from "@/components/onboarding/integration-step"

export default function IntegrationPage({ params }: { params: Promise<{ useCase: string }> }) {
  const resolvedParams = use(params)
  const { useCase } = resolvedParams

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <IntegrationStep useCase={useCase} />
    </div>
  )
}

