import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out Superu",
    features: [
      "1,000 free calls",
      "Basic AI voice capabilities",
      "Standard response time",
      "Email support",
      "Limited voice customization",
      "Basic analytics",
    ],
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
      "Detailed analytics dashboard",
      "Multiple AI agent profiles",
      "Webhook integrations",
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
      "White-labeling options",
      "SLA guarantees",
      "Custom AI training",
      "Multi-team management",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

const faqs = [
  {
    question: "How are calls counted?",
    answer:
      "A call is counted as a single conversation session with a customer, regardless of duration. Both inbound and outbound calls count toward your monthly total.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, changes will take effect at the start of your next billing cycle.",
  },
  {
    question: "Do unused calls roll over?",
    answer:
      "No, unused calls do not roll over to the next month. Your call allocation resets at the beginning of each billing cycle.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "The Professional plan is billed monthly with no long-term commitment. You can cancel anytime. Enterprise plans may have custom terms based on your organization's needs.",
  },
  {
    question: "What happens if I exceed my call limit?",
    answer:
      "If you exceed your monthly call limit, additional calls will be billed at a per-call rate. For Professional plans, this is $0.05 per additional call. You'll receive notifications as you approach your limit.",
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer:
      "Yes, we offer a 15% discount when you choose annual billing for the Professional plan. Contact our sales team for Enterprise annual billing options.",
  },
]

export default function PricingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Flexible Pricing for Every Business</h1>
            <p className="text-xl text-gray-700 mb-8">
              Choose the plan that works best for your needs, with our first 1000 calls always free.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-white">
        <div className="container-custom">
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
                    href={plan.name === "Enterprise" ? "/contact" : "/signup"}
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

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Customer Experience?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Get started with your first 1000 free calls today and see how Superu can revolutionize your business
              communications.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

