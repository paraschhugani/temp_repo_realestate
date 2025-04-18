"use client"

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import UseCasesSection from "@/components/use-cases-section"
import VoiceDemoSection from "@/components/voice-demo-section"
import HowItWorksSection from "@/components/how-it-works-section"
import ResultsSection from "@/components/results-section"
import FAQSection from "@/components/faq-section"
import CtaSection from "@/components/cta-section"
import Footer from "@/components/footer"
import { toastService } from "@/services/toast-service";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { DemoCallDialog } from "@/components/dialogues/demo-call";
import CallRatingModal from "@/components/call-rating-modal";

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

export default function Home() {
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [demoCallIsSubmitting, setDemoCallIsSubmitting] = useState(false)
  const [demoCallName, setDemoCallName] = useState("")
  const [demoCallEmail, setDemoCallEmail] = useState("")
  const [demoCallWebsite, setDemoCallWebsite] = useState("")
  const [callUUID, setCallUUID] = useState("")
  const [callFeedbackOpen, setCallFeedbackOpen] = useState(false)

  const baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  const closeFeedbackModal = (isOpen: boolean) => {
    setCallFeedbackOpen(isOpen)
    // window.location.href = "/launch/spa-and-salon-appointment-scheduling/form"
    setCallUUID("")
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      const formatted = value; // TODO : Format the phone number
      setPhoneNumber(formatted);
    }
  };

  const handleTestAgent = async () => {
    const response = await axios.post(`${baseURL}/democall`, {
      phoneNumber: selectedCountry?.dialCode + phoneNumber,
      vapi_assistant_id: "5c2f82e6-f1c9-400b-ad31-593a1138159c",
      name: demoCallName,
      email: demoCallEmail,
      website: demoCallWebsite
    },
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  )

  if (response.status === 200) {
    toastService.success("Your test assistant is calling — check your phone!")
    setIsTestDialogOpen(false)
    setCallUUID(response.data.id)
    setCallFeedbackOpen(true)
  } else {
    toastService.error("Something went wrong , please try again later")
  }

  }
  return (
    <main className="bg-white">
      {/* <Navbar /> */}
      <HeroSection setIsTestDialogOpen={setIsTestDialogOpen} setPhoneNumber={setPhoneNumber} setSelectedCountry={setSelectedCountry} countries={countries}/>
      <FeaturesSection />
      <UseCasesSection />
      <VoiceDemoSection />
      <HowItWorksSection />
      <ResultsSection />
      <FAQSection />
      <CtaSection />
      {/* <Footer /> */}
      <DemoCallDialog
        open={isTestDialogOpen}
        onOpenChange={setIsTestDialogOpen}
        phoneNumber={phoneNumber}
        onPhoneNumberChange={handlePhoneNumberChange}
        handleTestAgent={handleTestAgent}
        countries={countries}
        selectedCountry={selectedCountry || countries[0]}
        setSelectedCountry={(country) => setSelectedCountry(country as typeof countries[0])}
        demoCallIsSubmitting={demoCallIsSubmitting}
        setDemoCallIsSubmitting={setDemoCallIsSubmitting}
        demoCallName={demoCallName}
        setDemoCallName={setDemoCallName}
        demoCallEmail={demoCallEmail}
        setDemoCallEmail={setDemoCallEmail}
        demoCallWebsite={demoCallWebsite}
        setDemoCallWebsite={setDemoCallWebsite}
      />
      <CallRatingModal
        isOpen={callFeedbackOpen}
        onClose={() => closeFeedbackModal(false)}
        callUUID={callUUID}
      />
    </main>
  )
}
