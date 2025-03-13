"use client"

import { IntegrationService } from "@/services/integration-service";
import router, { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function CallbackPage() {
  const params = useParams();
  const userId = params.userId as string;
  const integrationId = params.integrationId as string;
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const { getToken, isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token ?? "");
    };
    fetchToken();

    const fetchIntegration = async () => {
      setIsLoading(true);
      const integrationService = new IntegrationService();
      const data = await integrationService.checkIntegrationConnection(userId, token ?? "", integrationId);
      setIsConnected(data.data.is_connected);
      setIsLoading(false);
      
      if (data.data.is_connected) {
        setTimeout(() => {
        //  router.push(`/launch/${useCase}/configure`);
        }, 3000);
      }
    };
    fetchIntegration();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Checking Connection Status...</h2>
              <p className="text-gray-500">Please wait while we verify your integration</p>
            </>
          ) : (
            <>
              <div className={`h-12 w-12 rounded-full mx-auto mb-4 flex items-center justify-center ${
                isConnected ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {isConnected ? (
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h2 className={`text-xl font-semibold mb-2 ${
                isConnected ? 'text-green-600' : 'text-red-600'
              }`}>
                {isConnected ? 'Successfully Connected!' : 'Connection Failed'}
              </h2>
              <p className="text-gray-500">
                {isConnected 
                  ? 'This window will close automatically in a few seconds...' 
                  : 'Please try again or contact support if the issue persists.'}
              </p>
            </>
          )}
          
          {/* <div className="mt-6 text-sm text-gray-500">
            <p>Integration ID: {integrationId}</p>
            <p>User ID: {userId}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
