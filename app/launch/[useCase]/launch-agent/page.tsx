import { ScriptForm } from "@/components/onboarding/script-form";

interface LaunchAgentPageProps {
  params: Promise<{ useCase: string }> | { useCase: string }
}

export default async function LaunchAgentPage({ params }: LaunchAgentPageProps) {
  const resolvedParams = await params;
  const { useCase } = resolvedParams
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <ScriptForm useCase={useCase} showLaunchAgent={true} />
  </div>
  );
}

