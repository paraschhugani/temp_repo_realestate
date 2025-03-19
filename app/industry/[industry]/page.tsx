"use client"
import { notFound, useParams } from "next/navigation"
import { UseCasesService } from "@/services/use-cases-service"
import { IndustryData, IndustryPageContent } from "@/components/use-case/IndustryPageContent"
import { useState, useEffect } from "react";



export default  function IndustryPage() {
  try {
   const params = useParams();
   const industry = params.industry as string;
    const [industryData, setIndustryData] = useState<IndustryData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchIndustryData = async () => {
        setIsLoading(true);
        const data = await UseCasesService.getIndustryData(industry);
        console.log(data);
        setIndustryData(data as IndustryData);
        setIsLoading(false);
      };
      fetchIndustryData();
    }, [industry]);

    if(isLoading) {
      return <div>Loading...</div>
    }

    if(!industryData) {
      return notFound()
    }

    return <IndustryPageContent industryData={industryData} industry={industry} />
  } catch (error) {
    console.error('Error in IndustryPage:', error)
    return notFound()
  }
}

