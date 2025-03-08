import { Zap, Layers, PhoneCall } from "lucide-react"

const features = [
  {
    title: "Easy Integration",
    description: "Seamlessly connect with your existing systems.",
    icon: Zap,
  },
  {
    title: "Industry-Specific Use Cases",
    description: "Tailored solutions for Health, Mortgage, Recruitment, and Real-Estate.",
    icon: Layers,
  },
  {
    title: "Automated Outbound Sales",
    description: "Boost sales with intelligent, automated calling.",
    icon: PhoneCall,
  },
]

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-white" id="features">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Superu?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform provides powerful AI voice capabilities with an intuitive no-code interface.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
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
      </div>
    </section>
  )
}

