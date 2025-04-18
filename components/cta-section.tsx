import Link from "next/link"
import { Play } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Real Estate Business?</h2>
          <p className="text-xl mb-8">
            Join the hundreds of real estate professionals who are saving time and closing more deals with superU.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="https://cal.com/superu/demo-setup-30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-md transition-all duration-300 text-center"
            >
              Book a Demo
            </Link>
            <button className="border-2 border-white text-white hover:bg-blue-700 font-semibold py-3 px-8 rounded-md transition-all duration-300 flex items-center justify-center">
              <Play className="mr-2 h-5 w-5" />
              Hear superU in Action
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
