"use client"
import { useParams } from "next/navigation";
import { IntegrationStep } from "@/components/onboarding/integration-step"


export default function IntegrationPage() {
  const params = useParams();
  const useCase = params.useCase as string;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <IntegrationStep useCase={useCase} />
    </div>
  )
}

