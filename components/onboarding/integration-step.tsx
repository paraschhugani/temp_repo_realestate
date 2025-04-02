"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GoogleCalendar, CalCom, Calendly } from "@/assets/svg/svgs";
import { IntegrationService } from "@/services/integration-service";
import { useAuth } from "@clerk/nextjs";
import { toastService } from "@/services/toast-service";
import ContinueCtaButton from "@/components/continue-cta-button";
import { CircleCheckBig } from "lucide-react";
export interface Provider {
  id: string;
  name: string;
  logo: () => React.JSX.Element;
}

const providers: Provider[] = [
  {
    id: "googlecalendar",
    name: "Google Calendar",
    logo: GoogleCalendar,
  },
  {
    id: "calendly",
    name: "Calendly",
    logo: Calendly,
  },
];

interface IntegrationStepProps {
  useCase: string;
  onComplete?: () => void;
  dashboard?: boolean;
  dashboardNextStep?: () => void;
}

export function IntegrationStep({ useCase, onComplete , dashboard, dashboardNextStep}: IntegrationStepProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  var channel = new BroadcastChannel(`integration`);
  const router = useRouter();
  const { getToken, userId } = useAuth();

  const handleProviderSelect = async (providerId: string) => {
    setSelectedProvider(providerId);
    const isConnected = await localcheckIntegrationConnection(providerId);
    if (!isConnected) {
      console.log("Connecting to integration");
      handleIntegrationConnect(providerId);
    }else{
      setIsConnected(true);
      toastService.success("Integration already connected!");
    }
  };

  channel.onmessage = function (e) {
    if(e.data)  setIsConnected(e.data);
    else setIsError(true)
  };

  async function localcheckIntegrationConnection(providerId: string){
    const token = await getToken();
    const integrationService = new IntegrationService();
    const data = await integrationService.checkIntegrationConnection(
      userId ?? "",
      token ?? "",
      providerId
    );
    console.log(data.data.is_connected);
    return data.data.is_connected;
  }
  const handleIntegrationConnect = async (providerId: string) => {
    if (!providerId) return;
    setIsLoading(true);
    try {

      const domain = window.location.host;
      const token = await getToken();
      const integrationService = new IntegrationService();
      const data = await integrationService.initializeIntegration(
        userId ?? "",
        token ?? "",
        providerId,
        domain
      );
      const redirectUrl = data.data.redirect_url;
      if (redirectUrl) {
        window.open(redirectUrl, "_blank");
        toastService.info("Please complete the integration in the new window");
      }
    } catch (err) {
      console.error("Failed to save integration:", err);
      toastService.error("Failed to initialize integration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      const integrationService = new IntegrationService();
      const data = await integrationService.checkIntegrationConnection(
        userId ?? "",
        token ?? "",
        selectedProvider
      );
      if (data.data.is_connected) {
        toastService.success("Integration connected successfully!");
        // router.push(`/launch/${useCase}/configure`);
        if (dashboard) {
          dashboardNextStep && dashboardNextStep();
        } else {
          // router.push(`/launch/${useCase}/audience`);
          router.push(`/launch/${useCase}/launch-agent`)
        }
      } else {
        toastService.warning(
          "Integration connection failed. Please check your integration and try again."
        );
        setSelectedProvider("");
      }
    } catch (error) {
      console.error("Failed to check integration connection:", error);
      toastService.error(
        "Failed to connect to the integration. Please try again later."
      );
      setSelectedProvider("");
    } finally {
      setIsLoading(false);
    }
  };

 

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold text-center mb-8">
          Choose Your Integration
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Select the calendar provider you want to integrate with Superu.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {providers.map((provider) => (
            <motion.div
              key={provider.id}
              className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
                selectedProvider === provider.id
                  ? `ring-2 ${isError ? "ring-red-600" :
                      !isConnected ? "ring-blue-500" : "ring-green-500"
                    } shadow-lg transform scale-105`
                  : "hover:shadow-lg"
              }`}
              onClick={() => handleProviderSelect(provider.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative inline-block">
                {isConnected && selectedProvider === provider.id && (
                  <div className="absolute top-0 right-0">
                    <CircleCheckBig className="text-green-500" />
                  </div>
                )}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-16 mb-4 flex items-center justify-center">
                    <provider.logo />
                  </div>
                  <span className="text-lg font-medium text-gray-900">
                    {provider.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        <div className="flex justify-center">
          <ContinueCtaButton
            text="Next"
            onClick={() => handleNextStep()}
            disabled={isLoading || !selectedProvider}
            isLoading={isLoading}
            loadingText="Checking connection..."
          />
        </div>
      </motion.div>
    </div>
  );
}
