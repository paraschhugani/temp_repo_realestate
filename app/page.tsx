// import HeroSection from "@/components/hero-section"
// import FeaturesSection from "@/components/features-section"
// import IndustrySection from "@/components/industry-section"
// import IntegrationSection from "@/components/integration-section"
// import PricingSection from "@/components/pricing-section"
// import CtaSection from "@/components/cta-section"

// export default function Home() {
//   return (
//     <>
//       <HeroSection />
//       <FeaturesSection />
//       <IndustrySection />
//       <IntegrationSection />
//       <PricingSection />
//       <CtaSection />
//     </>
//   )
// }

"use client"
import SpaHeroSection from "@/components/spa/hero-section"
import SpaTestimonialSection from "@/components/spa/testimonial-section"
import SpaImpactSection from "@/components/spa/impact-section"
import SpaHowItWorksSection from "@/components/spa/how-it-works-section"
import SpaPricingSection from "@/components/spa/pricing-section"
import SpaFaqSection from "@/components/spa/faq-section"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { toastService } from "@/services/toast-service";
import { useSearchParams } from 'next/navigation';
import axios from "axios";
import { useEffect, useState } from "react";
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

  const searchParams = useSearchParams();
  useEffect(() => {
    const test = searchParams.get('DEMOCALL');
    console.log(test)
    if (test) {
      setIsTestDialogOpen(true);
      setPhoneNumber("")
      setSelectedCountry(countries[0])
    }
  }, [searchParams]);
  

  const baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  const closeFeedbackModal = (isOpen: boolean) => {
    setCallFeedbackOpen(isOpen)
    window.location.href = "/launch/spa-and-salon-appointment-scheduling/form"
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
      vapi_assistant_id: "f74611d0-6216-4516-8dcc-5c421fc9ee8f",
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
      <SpaHeroSection title="Spa" setIsTestDialogOpen={setIsTestDialogOpen} setPhoneNumber={setPhoneNumber} setSelectedCountry={setSelectedCountry} countries={countries}/>
      <SpaHowItWorksSection setIsTestDialogOpen={setIsTestDialogOpen} setPhoneNumber={setPhoneNumber} setSelectedCountry={setSelectedCountry} countries={countries}/>
      <SpaTestimonialSection />
      <SpaImpactSection />
      <SpaPricingSection setIsTestDialogOpen={setIsTestDialogOpen} setPhoneNumber={setPhoneNumber} setSelectedCountry={setSelectedCountry} countries={countries}/>
      <SpaFaqSection/>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-24 text-white">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8 text-white">Ready to Transform Your Spa or Salon?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-blue-100">
            Get started with your first 100 free calls and see the difference Superu can make for your beauty business.
          </p>
          <div
            // href="/launch/spa-and-salon-appointment-scheduling/form"
            onClick={() => {
              setIsTestDialogOpen(true)
              setPhoneNumber("")
              setSelectedCountry(countries[0])
            }}
            className="inline-flex cursor-pointer items-center bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-10 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:scale-105 text-xl"
          >
            Get Started – Free for 7 days
            <ArrowRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </section>

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