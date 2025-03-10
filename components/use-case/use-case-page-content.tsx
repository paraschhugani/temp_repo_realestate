"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import HeroSection from "@/components/use-case/hero-section"
import FeaturesSection from "@/components/use-case/features-section"
import HowItWorksSection from "@/components/use-case/how-it-works-section"
import TestimonialSection from "@/components/use-case/testimonial-section"
import { UseCaseData } from "@/lib/use-case-data"

interface UseCasePageContentProps {
  useCaseData: UseCaseData
  industry: string
  useCase: string
}

export default function UseCasePageContent({ useCaseData, industry, useCase }: UseCasePageContentProps) {
  // Assuming we have 3 testimonials for each use case
  const testimonials = [useCaseData.testimonial, useCaseData.testimonial, useCaseData.testimonial]

  return (
    <main className="bg-white">
      <HeroSection
        title={useCaseData.title}
        subheadline={useCaseData.subheadline}
        industry={industry}
        useCase={useCase}
        href={`/launch/${useCase}/form`}
      />
      <FeaturesSection features={useCaseData.features} />
      <HowItWorksSection steps={useCaseData.howItWorks} />
      <TestimonialSection testimonials={testimonials} />

      {/* CTA Section */}
      <section className="bg-gray-100 py-24">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Transform Your {industry.charAt(0).toUpperCase() + industry.slice(1)} Business?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Get started with your first 1000 free calls and see the difference Superu can make.
          </p>
          <Link
            href={`/launch/${useCase}/form`}
            className="inline-flex items-center bg-black text-white hover:bg-gray-800 font-bold py-4 px-10 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:scale-105 text-xl"
          >
            Get Started – First 1000 Calls Free
            <ArrowRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  )
} 