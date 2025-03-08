"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

import googleCalendarSvg from "../../../../assets/svg/google-calendar.svg"
import calComSvg from "../../../../assets/svg/cal-com.svg"
import calendlySvg from "../../../../assets/svg/calendly.svg"

interface Provider {
  id: string
  name: string
  logo: string
}

const providers: Provider[] = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    logo: googleCalendarSvg,
  },
  {
    id: "cal-com",
    name: "Cal.com",
    logo: calComSvg,
  },
  {
    id: "calendly",
    name: "Calendly",
    logo: calendlySvg,
  },
]
console.log(providers)
export default function IntegrationPage({ params }: { params: Promise<{ useCase: string }> }) {
  const resolvedParams = use(params)
  const { useCase } = resolvedParams
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId)
  }

  const handleNextStep = async () => {
    if (!selectedProvider) return
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push(`/launch/${useCase}/configure`)
    } catch (err) {
      console.error("Failed to save integration:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-extrabold text-center mb-8">Choose Your Integration</h1>
          <p className="text-center text-gray-600 mb-12">
            Select the calendar provider you want to integrate with Superu.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {providers.map((provider) => (
              <motion.div
                key={provider.id}
                className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
                  selectedProvider === provider.id
                    ? "ring-2 ring-blue-500 shadow-lg transform scale-105"
                    : "hover:shadow-lg"
                }`}
                onClick={() => handleProviderSelect(provider.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-32 h-16 mb-4 flex items-center justify-center">
                    <Image
                      src={provider.logo || "/placeholder.svg"}
                      alt={`${provider.name} logo`}
                      width={120}
                      height={30}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <span className="text-lg font-medium text-gray-900">{provider.name}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center ">
            <Button onClick={handleNextStep} className="px-8 py-3 text-lg bg-black hover:bg-gray-800 text-white rounded" disabled={isLoading || !selectedProvider}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : ( 
                <>
                  Next
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

