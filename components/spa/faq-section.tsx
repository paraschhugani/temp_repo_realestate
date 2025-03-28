import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What exactly does the Voice AI assistant do?",
    answer:
      "Our voice assistant answers calls for your business 24/7, books appointments, shares service info, checks availability, collects contact details, and confirms bookings—just like a real receptionist (but faster and never off-duty!).",
  },
  {
    question: "Can I customize the voice and script?",
    answer:
      "Yes! You can choose a voice that fits your brand—soothing, energetic, or professional—and customize the greeting and flow to match your salon or spa's vibe.",
  },
  {
    question: "How do I test it before going live?",
    answer:
      "You'll get a personal demo and a test phone number to try out the assistant yourself. Make a few calls, hear how it sounds, and tweak anything you like before launching.",
  },
  {
    question: "What happens after I launch it?",
    answer:
      "Once you're happy with the setup, we give you a dedicated business number. Update it on Google Maps, Instagram, your website—anywhere your clients might call you. From there, the AI handles the rest.",
  },
  {
    question: "Will it integrate with my current calendar or booking system?",
    answer:
      "Yes! Our AI can sync with popular salon/spa booking tools (like Fresha, Vagaro, Calendly, etc.) to pull real-time availability and update your schedule seamlessly.",
  },
  {
    question: "Can it handle multiple locations or service providers?",
    answer:
      "Absolutely. Whether you have one studio or five, solo stylists or multiple team members, the AI can route calls and book appointments accordingly.",
  },
  {
    question: "Is it hard to set up?",
    answer:
      "Not at all. Most businesses are up and running in under 30 minutes—with our team helping every step of the way.",
  },
  {
    question: "What if a caller asks something unexpected?",
    answer:
      "Your assistant is trained to gracefully handle common questions and redirect anything outside her scope to your team via text or email. No call gets lost.",
  },
  {
    question: "Is this just for missed calls, or does it handle all inbound calls?",
    answer:
      "It can do both! Use it as a full-time receptionist or just as a safety net for missed and after-hours calls. You decide.",
  },
  {
    question: "What's the pricing?",
    answer: "We offer flexible monthly plans, starting from $49 per month. No long-term contracts.",
  },
]

export default function SpaFaqSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-50 to-purple-50" id="FAQ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center">🙋‍♀️ Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-md border border-blue-100"
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-medium text-left">
                  {index + 1}. {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

