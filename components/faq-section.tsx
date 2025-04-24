"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

const faqs = [
  {
    question: "How does superU sound so natural?",
    answer:
      "superU uses advanced AI voice technology that's been specifically trained for real estate conversations. We've developed proprietary techniques to ensure natural pauses, intonation, and conversational flow that makes superU indistinguishable from a human agent.",
  },
  {
    question: "Can superU handle complex real estate questions?",
    answer:
      "Yes! superU is trained on extensive real estate knowledge and can discuss property features, neighborhood information, pricing, and scheduling. If a question is too complex, superU can seamlessly transfer the call to a human agent or schedule a callback.",
  },
  {
    question: "How long does it take to set up superU for my team?",
    answer:
      "Most teams are up and running with superU in less than a day. Our onboarding process includes connecting your data sources, customizing superU's voice and scripts, and training your team on how to use the dashboard.",
  },
  {
    question: "Can I customize what superU says?",
    answer:
      "You have complete control over superU's scripts, responses, and conversation flow. You can customize how superU introduces herself, how she handles objections, and what qualifying questions she asks.",
  },
  {
    question: "How does superU integrate with my existing CRM?",
    answer:
      "superU integrates with all major real estate CRMs including Follow Up Boss, RealtyJuggler, and Salesforce. We also offer a Zapier integration for connecting to hundreds of other tools. All call recordings, notes, and appointments are automatically synced.",
  },
  {
    question: "What happens if superU can't answer a question?",
    answer:
      "superU is designed to recognize when she can't answer a question. In these cases, she can either schedule a callback from a human agent, transfer the call directly, or take a message - depending on how you configure her settings.",
  },
]

export default function FAQSection({ setIsTestDialogOpen, setPhoneNumber, setSelectedCountry, countries }: { setIsTestDialogOpen: (isOpen: boolean) => void, setPhoneNumber: (phoneNumber: string) => void, setSelectedCountry: (selectedCountry: any) => void, countries: any }) {
  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about superU and how she can help your real estate business.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">Still have questions? We're here to help.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="https://cal.com/superu/demo-setup-30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 flex items-center justify-center"
            >
              Book a Demo
            </Link>
            <button onClick={() => setIsTestDialogOpen(true)} className="btn-secondary px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-md transition-all duration-300 flex items-center justify-center">
            Hear superU in Action
          </button>
          </div>
        </div>
      </div>
    </section>
  )
}
