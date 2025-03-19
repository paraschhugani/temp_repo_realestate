"use client"
import { notFound, useParams } from "next/navigation"
import { UseCasesService } from "@/services/use-cases-service"
import UseCasePageContent from "@/components/use-case/use-case-page-content"
import { useState, useEffect } from "react";



export default function UseCasePage() {
 const  params = useParams();
 const industry = params.industry as string;
  const useCase = params.useCase as string;

  const [useCaseData, setUseCaseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUseCaseData = async () => {
      setIsLoading(true);
      const data = await UseCasesService.getUseCaseData(industry, useCase);
      setUseCaseData(data);
      setIsLoading(false);
    };
    fetchUseCaseData();
  }, [industry, useCase]);

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(!useCaseData) {
    notFound()
  }

  return <UseCasePageContent useCaseData={useCaseData} industry={industry} useCase={useCase} />
}

