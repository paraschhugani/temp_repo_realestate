import Link from "next/link"
import { ArrowRight } from "lucide-react"
import VoiceDemoContainer from "@/components/use-case/voice-demo-section";

interface SpaHeroSectionProps {
    title: string;
  }

export default function SpaHeroSection({ title }: SpaHeroSectionProps) {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 animate-fade-in leading-tight">
              Never Miss Client Call Again
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-700">
              Voice AI for Spas, Salons & Beauty Clinics
            </h2>
            <ul className="space-y-3 mb-10 text-lg">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Handle inbound appointment requests 24/7</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Confirm/cancel/reschedule appointments</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Answer pricing, service list, location, hours, policies</span>
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
    </section>
  )
}

