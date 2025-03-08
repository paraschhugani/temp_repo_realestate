import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center py-16 md:py-24 lg:py-32">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto animate-fade-in">
            Launch Your AI Voice Agent for Inbound Support & Automated Outbound Sales
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto animate-fade-in-delay">
            Superu is the no-code platform that empowers you to build human-like AI calling solutions effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
            <Link
              href="/launch/smart-meeting-scheduler/integration"
              className="btn-primary text-lg group-hover-arrow px-8 py-3"
            >
              Get Started – First 1000 Calls Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

