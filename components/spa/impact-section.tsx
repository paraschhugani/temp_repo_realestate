import { ArrowUp, Clock, Calendar } from "lucide-react"

const impactStats = [
  {
    id: 1,
    icon: Calendar,
    title: "+27% More Appointments Booked",
    description:
      "Businesses using our Voice AI see, on average, a 27% increase in confirmed bookings—just by capturing missed and after-hours calls.",
  },
  {
    id: 2,
    icon: ArrowUp,
    title: "3X Faster Call Response Time",
    description:
      "Our AI answers every call immediately—no hold music, no voicemail. Clients get instant attention, and your team stays focused on in-store guests.",
  },
  {
    id: 3,
    icon: Clock,
    title: "40+ Hours Saved Per Month",
    description:
      "On average, salons and spas save over 40 hours of front desk time per month—time that's now reinvested in giving clients a better in-person experience.",
  },
]

export default function SpaImpactSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center text-white">📊 What Kind of Impact Can You Expect?</h2>
          <p className="text-xl text-center mb-16 text-blue-100">
            Our AI voice assistant delivers measurable results for spas and salons of all sizes
          </p>

          <div className="space-y-12">
            {impactStats.map((stat, index) => (
              <div
                key={stat.id}
                className={`flex flex-col md:flex-row items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                  <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                      <stat.icon className="h-12 w-12 text-white" />
                    </div>
                  </div>
                </div>
                <div className={`md:w-2/3 ${index % 2 === 1 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-3">💸 {stat.title}</h3>
                    <p className="text-blue-100 text-lg">{stat.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

