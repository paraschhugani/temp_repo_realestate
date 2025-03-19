import axios from "axios";

interface UseCase {
  title: string;
  subheadline: string;
  features: { title: string }[];
}

interface IndustryData {
  title: string;
  description: string;
  useCases: Record<string, UseCase>;
}

const mockIndustryData: Record<string, IndustryData> = {
  default: {
    title: "Industry Solutions",
    description: "Discover how our solutions can transform your business operations",
    useCases: {
      "use-case-1": {
        title: "Process Automation",
        subheadline: "Streamline your workflows",
        features: [
          { title: "Automated data processing" },
          { title: "Workflow optimization" },
          { title: "Real-time monitoring" }
        ]
      },
      "use-case-2": {
        title: "Data Analytics",
        subheadline: "Make data-driven decisions",
        features: [
          { title: "Advanced analytics" },
          { title: "Custom reporting" },
          { title: "Predictive insights" }
        ]
      }
    }
  }
};

export class UseCasesService {
  private static baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

  static async getIndustryData(industry: string): Promise<IndustryData | null> {
    
    try {
      if (!this.baseUrl) {
        return mockIndustryData.default;
      }
      const response = await axios.get(`${UseCasesService.baseUrl}/usecases/industry/${industry}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching use cases:', error);
      return mockIndustryData.default;
    }
  }

  static async getUseCaseData(industry: string, useCase: string) {
    try {
      if (!this.baseUrl) {
        const defaultData = mockIndustryData.default;
        return defaultData.useCases[useCase] || null;
      }

      const response = await axios.get(`${UseCasesService.baseUrl}/usecases/industry/${industry}/${useCase}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching use case:', error);
      const defaultData = mockIndustryData.default;
      return defaultData.useCases[useCase] || null;
    }
  }
}
