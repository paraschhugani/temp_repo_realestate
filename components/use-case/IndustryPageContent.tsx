"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface UseCase {
  title: string
  subheadline: string
  features: { title: string }[]
}

interface IndustryData {
  title: string
  description: string
  useCases: Record<string, UseCase>
}

interface IndustryPageContentProps {
  industryData: IndustryData
  industry: string
}

export function IndustryPageContent({ industryData, industry }: IndustryPageContentProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gray-50">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fade-in text-black">
              {industryData.title}
            </h1>
            <p className="text-xl mb-8 animate-fade-in-delay text-gray-600">{industryData.description}</p>
            <Link
              href="/sign-up"
              className="btn-primary inline-flex items-center text-lg px-8 py-3 group animate-fade-in-delay-2"
            >
              Get Started - First 1000 Calls Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Use Case Cards Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Key Use Cases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryData.useCases && Object.entries(industryData.useCases).length > 0 ? (
              Object.entries(industryData.useCases).map(([slug, useCase]) => (
                <div
                  key={slug}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{useCase.title}</h3>
                    <p className="text-gray-600 mb-4">{useCase.subheadline}</p>
                    <ul className="mb-6 space-y-2">
                      {useCase.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature.title}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/industry/${industry}/${slug}`}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600">No use cases found for this industry.</div>
            )}
          </div>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Don't see your specific need?</h2>
          <p className="text-xl mb-8 text-gray-600">
            Contact us to discover how Superu can tailor solutions for your{" "}
            {industry.charAt(0).toUpperCase() + industry.slice(1)} challenges.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-blue-600 text-white hover:bg-blue-700 font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Contact Us Now
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  )
} 