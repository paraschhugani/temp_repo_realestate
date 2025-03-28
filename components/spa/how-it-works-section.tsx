import Link from "next/link"
import { ArrowRight, Settings, Phone, Rocket } from "lucide-react"

const steps = [
  {
    id: 1,
    icon: Settings,
    title: "Configure",
    description:
      "Choose a voice that fits your brand's personality—calm and soothing, cheerful and friendly, or anything in between.",
  },
  {
    id: 2,
    icon: Phone,
    title: "Test",
    description:
      "Call yourself to hear your AI assistant in action. Make sure everything sounds perfect and works smoothly with your setup.",
  },
  {
    id: 3,
    icon: Rocket,
    title: "Launch",
    description:
      "Get a dedicated business phone number, then update it across Google Maps, your website, Instagram, and anywhere clients find you.",
  },
]

export default function SpaHowItWorksSection() {
  return (
    <section className="py-24 bg-white" id="HIW">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 border border-blue-100"
            >
              <div className="text-3xl font-bold text-purple-600 mb-4 flex items-center">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-full mr-4">
                  <step.icon className="h-6 w-6 text-purple-600" />
                </div>
                 {step.id}. {step.title}
              </div>
              <p className="text-gray-600 text-lg">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/launch/spa-and-salon-appointment-scheduling/form"
            className="btn-primary inline-flex items-center text-xl px-10 py-4 group bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

