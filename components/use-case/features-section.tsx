import { CheckCircle } from "lucide-react"

interface Feature {
  title: string
  description: string
}

interface FeaturesSectionProps {
  features: Feature[]
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center">Features That Drive Results</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <CheckCircle className="h-12 w-12 mb-6 text-black" />
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

