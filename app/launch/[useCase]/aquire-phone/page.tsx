"use client"

import { useRouter } from "next/navigation"
import { PhoneAcquisitionForm } from "@/components/phone-aquisition"
import { use } from "react"

export default function AcquirePhonePage({ params }: { params: Promise<{ useCase: string }> }) {
    const resolvedParams = use(params)
    const { useCase } = resolvedParams
    const router = useRouter()

  const handleAcquireNumber = async (countryCode: string, provider: string) => {
    //TODO: Implement the logic to acquire the number
  }


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <PhoneAcquisitionForm onAcquire={handleAcquireNumber} />
    </div>
  )
}

