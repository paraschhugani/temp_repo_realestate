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

import SpaHeroSection from "@/components/spa/hero-section"
import SpaTestimonialSection from "@/components/spa/testimonial-section"
import SpaImpactSection from "@/components/spa/impact-section"
import SpaHowItWorksSection from "@/components/spa/how-it-works-section"
import SpaPricingSection from "@/components/spa/pricing-section"
import SpaFaqSection from "@/components/spa/faq-section"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="bg-white">
      <SpaHeroSection title="Spa" />
      <SpaTestimonialSection />
      <SpaImpactSection />
      <SpaHowItWorksSection />
      <SpaPricingSection />
      <SpaFaqSection />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-24 text-white">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8 text-white">Ready to Transform Your Spa or Salon?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-blue-100">
            Get started with your first 100 free calls and see the difference Superu can make for your beauty business.
          </p>
          <Link
            href="/launch/useCase=automated-meeting-confirmation/form"
            className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-10 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:scale-105 text-xl"
          >
            Get Started – First 100 Calls Free
            <ArrowRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  )
}