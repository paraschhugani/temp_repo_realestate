import { notFound } from "next/navigation"
import { UseCasesService } from "@/services/use-cases-service"
import UseCasePageContent from "@/components/use-case/use-case-page-content"

interface PageProps {
  params: Promise<{
    industry: string
    useCase: string
  }>
}

export default async function UseCasePage({ params }: PageProps) {
  const resolvedParams = await params
  const industry = resolvedParams.industry.toLowerCase()
  const useCase = resolvedParams.useCase.toLowerCase()

  const useCaseData = await UseCasesService.getUseCaseData(industry, useCase)

  if (!useCaseData) {
    notFound()
  }

  return <UseCasePageContent useCaseData={useCaseData} industry={industry} useCase={useCase} />
}

