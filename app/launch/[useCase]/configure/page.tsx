"use client"

import ConfigureAIAgent from "@/components/onboarding/configure-ai-agent"

export default function Page({ params }: { params: Promise<{ useCase: string }> }) {
  return <ConfigureAIAgent params={params} />
}
