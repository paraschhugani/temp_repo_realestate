import { Upload, BookOpen, Phone, BarChart } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    title: "Upload Your Data",
    description: "Connect your listings, CRM contacts, and lead sources",
    icon: Upload,
  },
  {
    title: "superU Learns",
    description: "She adapts to your scripts, FAQs, and communication style",
    icon: BookOpen,
  },
  {
    title: "Receive/Make Calls",
    description: "Instant outreach to new and existing leads",
    icon: Phone,
  },
  {
    title: "Get Results",
    description: "Receive qualified leads and booked appointments",
    icon: BarChart,
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Getting started with superU is simple and seamless.</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="h-10 w-10 text-blue-600" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-blue-200 -z-10 transform -translate-x-10"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center gap-4">
            <Link
              href="https://cal.com/superu/demo-setup-30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 flex items-center justify-center"
            >
              Book a Demo
            </Link>
            <button className="btn-secondary px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-md transition-all duration-300 flex items-center justify-center">
              Hear superU in Action
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
