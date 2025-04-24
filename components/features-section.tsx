import { MessageCircle, Calendar, Clock, BarChart3, Headphones, RefreshCw } from "lucide-react"
import Link from "next/link"

const features = [
  {
    title: "Natural Conversations",
    description: "superU speaks naturally with pauses, filler words, and human-like responses.",
    icon: MessageCircle,
  },
  {
    title: "Appointment Booking",
    description: "Automatically schedules showings and meetings in your calendar.",
    icon: Calendar,
  },
  {
    title: "24/7 Availability",
    description: "Never miss a lead with round-the-clock response.",
    icon: Clock,
  },
  {
    title: "Performance Analytics",
    description: "Track call outcomes, conversion rates, and ROI.",
    icon: BarChart3,
  },
  {
    title: "Call Handling",
    description: "Manages objections, answers FAQs, and qualifies leads.",
    icon: Headphones,
  },
  {
    title: "Follow-up Automation",
    description: "Persistent follow-up with leads until they convert.",
    icon: RefreshCw,
  },
]

export default function FeaturesSection({ setIsTestDialogOpen, setPhoneNumber, setSelectedCountry, countries }: { setIsTestDialogOpen: (isOpen: boolean) => void, setPhoneNumber: (phoneNumber: string) => void, setSelectedCountry: (selectedCountry: any) => void, countries: any }) {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why superU Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            superU is designed specifically for real estate professionals, with features that drive results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Added CTAs */}
        <div className="flex justify-center gap-4">
          <Link
            href="https://cal.com/superu/demo-setup-30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 flex items-center justify-center"
          >
            Book a Demo
          </Link>
          <button onClick={() => setIsTestDialogOpen(true)} className="btn-secondary px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-md transition-all duration-300 flex items-center justify-center">
            Hear superU in Action
          </button>
        </div>
      </div>
    </section>
  )
}
