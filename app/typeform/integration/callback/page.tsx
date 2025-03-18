"use client"
import { useParams, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { IntegrationService } from "@/services/integration-service";
import { useEffect, useState } from "react";

export default function TypeformCallbackPage() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const { getToken, userId } = useAuth();
    const [success , setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        const checkConnection = async () => {
            setIsLoading(true);
            const token = await getToken();
            const integrationService = new IntegrationService();
            const isValid = await integrationService.checkTypeformConnection(userId ?? " ", token ?? " ", code ?? " ");
            if(isValid){
                setSuccess(true);
            }
            setIsLoading(false);
        }
        checkConnection();
    }, [code, getToken, userId]);
    
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
                success ? 'bg-green-100' : 'bg-red-100'
              }`}>
                { success ? (
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
                success ? 'text-green-600' : 'text-red-600'
              }`}>
                {success ? `Successfully Connected to Typeform!` : 'Connection Failed'}
              </h2>
              <p className="text-gray-500 mb-2">
                {success 
                  ? 'This window will close automatically in a few seconds...' 
                  : 'Please try again or contact support if the issue persists.'}
              </p>
              
              {success && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-blue-700 font-medium">
                    Please return to the previous tab and click <span className="font-bold">Next</span> to proceed with configuring your AI agent
                  </p>
                </div>
              )}
            </>
          )}
          
          {/* Debug information - comment out in production */}
          {/* <div className="mt-6 text-sm text-gray-500 border-t pt-4">
            <p>App Name: {appName}</p>
            <p>Integration ID: {integrationId}</p>
            <p>User ID: {userId}</p>
            <p>Connected Account ID: {connectedAccountId}</p>
            <p>Status: {status}</p>
          </div> */}
        </div>
      </div>
    </div>
    )
}
