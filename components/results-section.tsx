import Link from "next/link"

const stats = [
  { value: "3x", label: "More Qualified Appointments" },
  { value: "20hrs", label: "Saved Per Agent Weekly" },
  { value: "70%", label: "Cold Lead Re-engagement" },
  { value: "50%", label: "Reduction in No-shows" },
]

const testimonials = [
  {
    quote:
      "We followed up with every single lead — without hiring more staff. superU's doing more follow-up than my entire team.",
    author: "Michael Rodriguez",
    title: "Team Lead, Century 21",
    avatar: "/abstract-geometric.png",
  },
  {
    quote:
      "Our showing appointments increased by 40% within 2 weeks. superU is like an ISA who never sleeps, never forgets, and never burns out.",
    author: "Sarah Chen",
    title: "Broker, Compass",
    avatar: "/abstract-geometric-shapes.png",
  },
  {
    quote: "Over 70% of our previously cold leads re-engaged after superU called them. The ROI was immediate.",
    author: "David Thompson",
    title: "Sales Manager, RE/MAX",
    avatar: "/abstract-geometric-dt.png",
  },
]

export default function ResultsSection() {
  return (
    <section className="py-12 bg-white" id="results">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Real Results from Real Teams</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how superU is transforming real estate businesses across the country.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1">{stat.value}</div>
              <p className="text-gray-700 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="mb-3">
                <svg className="h-6 w-6 text-blue-400" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-3 text-sm">{testimonial.quote}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-sm">{testimonial.author}</h4>
                  <p className="text-xs text-gray-600">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

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
