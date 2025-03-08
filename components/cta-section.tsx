import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Customer Experience?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Claim your first 1000 free calls today and see how Superu can revolutionize your business communications.
          </p>
          <Link
            href="/launch"
            className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Get Started – First 1000 Calls Free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

