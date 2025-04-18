import { Phone, RefreshCw, Home, HomeIcon as House, Calendar, HeadphonesIcon } from "lucide-react"
import Link from "next/link"

const useCases = [
  {
    title: "Instant Lead Response",
    description: "Call Zillow or website leads immediately with qualifying questions",
    icon: Phone,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Reactivate Past Buyers",
    description: "Follow up with past inquiries and inactive clients",
    icon: RefreshCw,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Renter Conversion",
    description: "Reach out pre-lease-end to convert renters to buyers",
    icon: Home,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Open House Follow-up",
    description: "Get feedback and offer next steps after open houses",
    icon: House,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Showing Coordination",
    description: "Schedule viewings and reduce appointment no-shows",
    icon: Calendar,
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Inside Sales Support",
    description: "Augment or replace your inside sales team",
    icon: HeadphonesIcon,
    color: "bg-indigo-50 text-indigo-600",
  },
]

export default function UseCasesSection() {
  return (
    <section className="py-20 bg-gray-50" id="use-cases">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Real Estate-Specific Use Cases</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            superU handles the most time-consuming tasks for real estate professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div
                className={`${useCase.color.split(" ")[0]} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4`}
              >
                <useCase.icon className={`h-6 w-6 ${useCase.color.split(" ")[1]}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
              <p className="text-gray-600">{useCase.description}</p>
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
          <button className="btn-secondary px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-md transition-all duration-300 flex items-center justify-center">
            Hear superU in Action
          </button>
        </div>
      </div>
    </section>
  )
}
