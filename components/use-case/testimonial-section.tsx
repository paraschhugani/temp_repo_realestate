import { Quote } from "lucide-react"

interface Testimonial {
  text: string
  author: string
  role: string
}

interface TestimonialSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-xl relative">
              <Quote className="h-12 w-12 text-black opacity-10 absolute top-4 right-4" />
              <p className="text-lg mb-8 italic relative z-10">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

