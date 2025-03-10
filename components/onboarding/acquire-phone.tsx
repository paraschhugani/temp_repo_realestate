"use client"

import { useRouter } from "next/navigation"
import { PhoneAcquisitionForm } from "@/components/phone-aquisition"

interface AcquirePhoneProps {
  useCase: string;
  onComplete?: () => void;
}

export function AcquirePhone({ useCase, onComplete }: AcquirePhoneProps) {
  const router = useRouter()

  const handleAcquireNumber = async (countryCode: string, provider: string) => {
    // TODO: Implement the logic to acquire the number
    if (onComplete) {
      onComplete()
    }
    // If no onComplete callback is provided, the PhoneAcquisitionForm component
    // will handle the navigation internally
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PhoneAcquisitionForm onAcquire={handleAcquireNumber} />
    </div>
  )
} 