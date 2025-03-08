import Link from "next/link"
import { ArrowRight } from "lucide-react"
import InteractiveUI from "./interactive-ui"

interface HeroSectionProps {
  title: string
  subheadline: string
  industry: string
  useCase: string
  href: string // Add this line to include the href prop
}

export default function HeroSection({ title, subheadline, industry, useCase, href }: HeroSectionProps) {
  return (
    <section className="bg-gray-50 py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 animate-fade-in leading-tight">
              {title}
            </h1>
            <p className="text-xl mb-10 animate-fade-in-delay text-gray-600">{subheadline}</p>
            <Link
              href={href} // Use the href prop here instead of hardcoding the path
              className="btn-primary inline-flex items-center text-lg px-8 py-4 group animate-fade-in-delay-2 bg-black text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Get Started – First 1000 Calls Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="md:w-1/2">
            <InteractiveUI industry={industry} useCase={useCase} />
          </div>
        </div>
      </div>
    </section>
  )
}

