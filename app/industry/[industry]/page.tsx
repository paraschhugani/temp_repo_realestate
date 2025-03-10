import { notFound } from "next/navigation"
import { UseCasesService } from "@/services/use-cases-service"
import { IndustryPageContent } from "@/components/use-case/IndustryPageContent"

interface PageProps {
  params: Promise<{ industry: string }> | { industry: string }
}

export default async function IndustryPage({ params }: PageProps) {
  try {
    const resolvedParams = await params
    const industry = resolvedParams.industry.toLowerCase()
    const industryData = await UseCasesService.getIndustryData(industry)

    if (!industryData) {
      return notFound()
    }

    return <IndustryPageContent industryData={industryData} industry={industry} />
  } catch (error) {
    console.error('Error in IndustryPage:', error)
    return notFound()
  }
}

