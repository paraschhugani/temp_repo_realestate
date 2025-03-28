"use client"
import { useParams } from "next/navigation";
import AgentType from "@/components/onboarding/agent-type"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StorageService } from "@/services/storage-service";


export default function AgentTypePage() {
  const params = useParams();
  const useCase = params.useCase as string;
  const [agentType, setAgentType] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (agentType) {
      StorageService.setItem(`agentType-${useCase}`, agentType);
      router.push(`/launch/${useCase}/form`);
    }
  }, [agentType]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <AgentType setAgentType={setAgentType} />
    </div>
  )
}
