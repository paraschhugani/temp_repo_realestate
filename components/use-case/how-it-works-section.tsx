import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Step {
  title: string
  description: string
}

interface HowItWorksSectionProps {
  steps: Step[]
}

export default function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105"
            >
              <div className="text-3xl font-bold text-black mb-4 opacity-50">{index + 1}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center text-xl px-10 py-4 group bg-black text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            Start Your First Campaign
            <ArrowRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

