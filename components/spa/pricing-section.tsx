import Link from "next/link"
import { ArrowRight, Check, Clock } from "lucide-react"

const features = [
  "📞 Up to 300 Calls/Month",
  "🤖 Advanced AI Voice Capabilities",
  "⚡ Priority Response Time",
  "📧 Phone & Email Support",
  "🎙️ Custom Voice Options",
  "📊 Detailed Analytics Dashboard",
]

export default function SpaPricingSection() {
  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl overflow-hidden border border-blue-100">
            {/* Special Offer Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 text-center relative">
              <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-1 rotate-3 shadow-sm">
                BEST DEAL
              </div>
              <h3 className="text-2xl font-bold mb-1">💰 Special Offer Ends Soon!</h3>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl line-through opacity-75">$199/month</span>
                <span className="bg-white text-blue-600 text-sm font-bold px-2 py-1 rounded-full">Save 75%</span>
              </div>
              <div className="text-sm mt-1 flex items-center justify-center">
                <Clock className="h-4 w-4 mr-1" />
                Offer ends in 12 hours!
              </div>
            </div>

            {/* Main Pricing Content */}
            <div className="p-8 text-center">
              <h3 className="text-3xl font-bold mb-2">🔥 Limited-Time Deal:</h3>
              <div className="text-5xl font-bold text-blue-600 mb-6">Just $49/month</div>

              <div className="h-px bg-gray-200 w-full my-6"></div>

              <h4 className="text-xl font-semibold mb-4">✅ Everything You Need:</h4>
              <ul className="space-y-3 text-left mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="h-px bg-gray-200 w-full my-6"></div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-2">🔐 30-Day Money Back Guarantee</h4>
                <p className="text-gray-600">
                  Try it risk-free. If you're not happy, get a full refund—no questions asked.
                </p>
              </div>

              <Link
                href="/launch/spa-and-salon-appointment-scheduling/form"
                className="btn-primary inline-flex items-center text-lg px-8 py-4 w-full justify-center bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

