"use client"
import { notFound, useParams } from "next/navigation"
import { UseCasesService } from "@/services/use-cases-service"
import { IndustryPageContent } from "@/components/use-case/IndustryPageContent"

export default async function IndustryPage() {
  try {
    const params = useParams();
    const industry = params.industry as string;
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

