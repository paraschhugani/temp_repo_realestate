"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import VoiceDemoContainer from "@/components/use-case/voice-demo-section";
import { Phone } from "lucide-react";
interface SpaHeroSectionProps {
    title: string;
  }
import { DemoCallDialog } from "@/components/dialogues/demo-call";
import { useState } from "react";
import axios from "axios";
import { toastService } from "@/services/toast-service";

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "IN", name: "India", flag: "🇮🇳", dialCode: "+91" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { code: "CA", name: "Canada", flag: "🇨🇦", dialCode: "+1" },
  { code: "AU", name: "Australia", flag: "🇦🇺", dialCode: "+61" },
  { code: "DE", name: "Germany", flag: "🇩🇪", dialCode: "+49" },
  { code: "FR", name: "France", flag: "🇫🇷", dialCode: "+33" },
  { code: "JP", name: "Japan", flag: "🇯🇵", dialCode: "+81" },
  { code: "CN", name: "China", flag: "🇨🇳", dialCode: "+86" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", dialCode: "+55" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", dialCode: "+52" },
  { code: "IT", name: "Italy", flag: "🇮🇹", dialCode: "+39" },
  { code: "ES", name: "Spain", flag: "🇪🇸", dialCode: "+34" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", dialCode: "+82" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", dialCode: "+31" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", dialCode: "+65" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", dialCode: "+971" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", dialCode: "+966" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", dialCode: "+27" },
  { code: "RU", name: "Russia", flag: "🇷🇺", dialCode: "+7" },
]

export default function SpaHeroSection({ title }: SpaHeroSectionProps) {
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  

  const baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      const formatted = value; // TODO : Format the phone number
      setPhoneNumber(formatted);
      setSelectedCountry(countries[0])
      setIsTestDialogOpen(false)

      toastService.success("You will receive a call from the AI agent shortly")

    }
  };

  const handleTestAgent = async () => {
    const response = await axios.post(`${baseURL}/democall`, {
      phoneNumber: selectedCountry?.dialCode + phoneNumber,
      vapi_assistant_id: "f74611d0-6216-4516-8dcc-5c421fc9ee8f"
    },
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  )
  }

  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 animate-fade-in leading-tight">
              Never Miss Client Call Again
              </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-700">
              AI Receptionist for Spas, Salons & Beauty Clinics
            </h2>
            <ul className="space-y-3 mb-10 text-lg">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span>Answer calls 24/7 — no missed bookings</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span>Confirm, cancel, or reschedule appointments</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span>Instantly respond to pricing, services, hours & more</span>
              </li>
            </ul>
            <Link
              href="/launch/spa-and-salon-appointment-scheduling/form"
              className="btn-primary inline-flex items-center text-lg px-8 py-4 group animate-fade-in-delay-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Get Started – Free for today
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="flex justify-end cursor-pointer ">
                <button
                  onClick={() => {
                    setIsTestDialogOpen(true)
                    setPhoneNumber("")
                    setSelectedCountry(countries[0])
                  }}
                  className="mb-4 cursor-pointer inline-flex items-center bg-black text-white hover:bg-gray-800 font-medium py-2 px-5 text-sm rounded-md transition transform duration-300 hover:scale-105 shadow-md hover:shadow-lg group"
                >
                  <Phone className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                  Try Now - Get a Demo Call
                </button>
              </div>
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="aspect-video rounded-md flex items-center justify-center mb-4">
              <VoiceDemoContainer
                  title={title}
                  description={`An AI ${title.toLowerCase()} agent is having a conversation with a customer, demonstrating how it handles real-world scenarios.`}
                  durationInSeconds={88}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">See the AI in action</h3>
              <p className="text-gray-600">
                Watch how our AI assistant handles appointment bookings, reschedules, and answers common questions for
                spa and salon clients.
              </p>
            </div>
          </div>
        </div>
      </div>

      <DemoCallDialog
        open={isTestDialogOpen}
        onOpenChange={setIsTestDialogOpen}
        phoneNumber={phoneNumber}
        onPhoneNumberChange={handlePhoneNumberChange}
        handleTestAgent={handleTestAgent}
        countries={countries}
        selectedCountry={selectedCountry || countries[0]}
        setSelectedCountry={(country) => setSelectedCountry(country as typeof countries[0])}
      />
    </section>
  )
}

