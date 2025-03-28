import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    business: "Bliss & Bare Skincare Studio",
    text: "Before using superU AI, we were missing 6–10 calls a week. Now, every caller is greeted instantly, and bookings just flow into our calendar—even after hours. It feels like we hired a 24*7 receptionist, minus the overhead!",
  },
  {
    id: 2,
    business: "The Brow Boutique",
    text: "We were skeptical at first, but the voice assistant sounds so natural. Clients even compliment her! She's handled over 300 calls for us and our front desk finally has time to breathe.",
  },
  {
    id: 3,
    business: "Glow Theory Medspa",
    text: "The setup took less than 10 minutes and it's been a game-changer. We no longer lose leads during peak hours. Our bookings are up 30% and our team can now focus on delivering a better in-clinic experience.",
  },
  {
    id: 4,
    business: "Lush Locks Hair Studio",
    text: "Our AI receptionist has become a part of the team! She takes bookings, reschedules clients, and even answers FAQs. We didn't realize how many calls we were missing until we saw the results.",
  },
  {
    id: 5,
    business: "Serenity Thai Spa",
    text: "We used to get overwhelmed with calls during weekends. Now, clients just talk to the assistant, and everything gets booked without stress. It's like having a second front desk that works 24/7.",
  },
  {
    id: 6,
    business: "LUXE Hair Studio",
    text: "As a luxury salon, client experience is key—missed calls hurt revenue and reputation. With superU, our front desk runs smoothly. Their Voice AI books, reschedules, and keeps our brand voice. We gained $4,000 in a month—without extra hires."
  },
]

export default function SpaTestimonialSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 shadow-xl relative border border-blue-100"
            >
              <Quote className="h-12 w-12 text-blue-500 opacity-10 absolute top-4 right-4" />
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  ⭐️
                </div>
                <h3 className="ml-3 font-semibold">{testimonial.business}</h3>
              </div>
              <p className="text-lg italic relative z-10">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

