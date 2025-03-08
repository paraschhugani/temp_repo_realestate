"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const countries = [
  { code: "+91", name: "India" },
  { code: "+1", name: "United States" },
]

const providers = [
  { id: "plivo", name: "Plivo" },
  { id: "twilio", name: "Twilio" },
]

interface PhoneAcquisitionFormProps {
  onAcquire: (countryCode: string, provider: string) => void
}

export function PhoneAcquisitionForm({ onAcquire }: PhoneAcquisitionFormProps) {
  const [countryCode, setCountryCode] = useState("+91")
  const [provider, setProvider] = useState("plivo")

  const handleAcquireNumber = () => {
    onAcquire(countryCode, provider)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Purchase Phone Number</h1>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="country-code" className="text-sm font-medium text-gray-700">
            Country Code
          </label>
          <Select value={countryCode} onValueChange={setCountryCode}>
            <SelectTrigger id="country-code" className="w-full">
              <SelectValue placeholder="Select country code" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="provider" className="text-sm font-medium text-gray-700">
            Provider
          </label>
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger id="provider" className="w-full">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              {providers.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  {provider.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleAcquireNumber}
          className="w-full bg-black hover:bg-gray-800 text-white group transition-all duration-300 ease-in-out"
        >
          Acquire Number
          <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  )
}

