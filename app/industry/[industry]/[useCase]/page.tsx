"use client"
import { notFound, useParams } from "next/navigation";
import { UseCasesService } from "@/services/use-cases-service";
import UseCasePageContent from "@/components/use-case/use-case-page-content";



export default async function UseCasePage() {
  const params = useParams();
  const industry = params.industry as string;
  const useCase = params.useCase as string;
  const industryLower = industry.toLowerCase();
  const useCaseLower = useCase.toLowerCase();

  const useCaseData = await UseCasesService.getUseCaseData(industryLower, useCaseLower);

  if (!useCaseData) {
    notFound();
  }

  return (
    <UseCasePageContent
      useCaseData={useCaseData}
      industry={industryLower}
      useCase={useCaseLower}
    />
  );
}
