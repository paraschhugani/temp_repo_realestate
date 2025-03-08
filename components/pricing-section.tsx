import Link from "next/link"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out Superu",
    features: ["1,000 free calls", "Basic AI voice capabilities", "Standard response time", "Email support"],
    cta: "Start Free Now",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "Ideal for growing businesses",
    features: [
      "5,000 calls included",
      "Advanced AI voice capabilities",
      "Priority response time",
      "Phone & email support",
      "Custom voice options",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale operations",
    features: [
      "Unlimited calls",
      "Premium AI voice capabilities",
      "Fastest response time",
      "Dedicated support manager",
      "Custom integrations",
      "Advanced analytics",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export default function PricingSection() {
  return (
    <section className="section-padding bg-white" id="pricing">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Flexible Pricing for Every Business</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your needs, with our first 1000 calls always free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? "shadow-lg border-2 border-blue-500 relative"
                  : "shadow-sm border border-gray-100 hover:shadow-md"
              }`}
            >
              {plan.highlighted && (
                <div className="bg-blue-500 text-white text-xs font-bold uppercase py-1 px-4 text-center">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">{plan.period}</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === "Enterprise" ? "/contact" : "/launch"}
                  className={`block text-center py-2 px-4 rounded-md font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

