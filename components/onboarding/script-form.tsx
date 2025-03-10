"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const initialQuestions = [
  {
    label: "Agent Name",
    id: "agentName",
    question: "Agent Name",
    type: "text",
    placeholder: "Enter agent name",
  },
  {
    label: "Introduction",
    id: "introduction",
    question: "May I speak with {Customer Name}?",
    type: "text",
    placeholder: "May I speak with {Customer Name}?",
  },
  {
    label: "Book a Meeting Acknowledgement",
    id: "meetingAcknowledgement",
    question: "Thank you for filling out our 'Book a Meeting' form.",
    type: "text",
    placeholder: "Thank you for filling out our 'Book a Meeting' form.",
  },
  {
    label: "Purpose of the Call",
    id: "callPurpose",
    question: "I'm calling to collect a few details before your demo. This helps us set the scope and pricing.",
    type: "text",
    placeholder: "I'm calling to collect a few details before your demo. This helps us set the scope and pricing.",
  },
  {
    label: "Information Gathering",
    id: "annualIncome",
    question: "What is your estimated annual income?",
    type: "text",
    placeholder: "What is your estimated annual income?",
  },
  {
    id: "taxYear",
    question: "Which tax year did you last file?",
    type: "text",
    placeholder: "Which tax year did you last file?",
  },
  {
    id: "llcDetails",
    question: "Do you have an LLC? If so, can you share some details?",
    type: "textarea",
    placeholder: "Do you have an LLC? If so, can you share some details?",
  },
  {
    id: "startTimeline",
    question: "When do you plan to get started?",
    type: "text",
    placeholder: "When do you plan to get started?",
  },
  {
    id: "businessInfo",
    question: "Can you tell me a little about your business?",
    type: "textarea",
    placeholder: "Can you tell me a little about your business?",
  },
  {
    label: "Confirmation & Next Steps",
    id: "confirmation",
    question:
      "Thank you. Let me repeat: Your estimated income is [Repeat Income], you filed taxes for the [Repeat Tax Year], you [do/do not] have an LLC, and you're planning to start [insert timeline]. Is that correct?",
    type: "textarea",
    placeholder:
      "Thank you. Let me repeat: Your estimated income is [Repeat Income], you filed taxes for the [Repeat Tax Year], you [do/do not] have an LLC, and you're planning to start [insert timeline]. Is that correct?",
  },
  {
    id: "meetingSchedule",
    question: "Great. You will meet with [Otto AI Team Member] on [Meeting Date] at [Meeting Time]. Correct?",
    type: "text",
    placeholder: "Great. You will meet with [Otto AI Team Member] on [Meeting Date] at [Meeting Time]. Correct?",
  },
  {
    id: "additionalQuestions",
    question: "Any other questions?",
    type: "text",
    placeholder: "Any other questions?",
  },
  {
    label: "Closing the Call",
    id: "closingCall",
    question: "Thank you, [Customer Name]. We look forward to speaking with you soon. Have a great day!",
    type: "text",
    placeholder: "Thank you, [Customer Name]. We look forward to speaking with you soon. Have a great day!",
  },
]

interface ScriptFormProps {
  useCase: string;
  onSubmit?: () => void;
}

export function ScriptForm({ useCase, onSubmit }: ScriptFormProps) {
  const [questions, setQuestions] = useState(initialQuestions)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (index: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index].question = value
    setQuestions(newQuestions)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      console.log("Form data:", questions)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      if (onSubmit) {
        onSubmit()
      } else {
        router.push(`/launch/${useCase}/integration`)
      }
    } catch (err) {
      console.error("Failed to submit form:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatUseCase = (str: string) => {
    if (!str) return ""
 
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-extrabold text-center mb-2">Configure Your AI Agent Script</h1>
        <h2 className="text-lg font-semibold text-center text-gray-600 mb-2">UseCase: {formatUseCase(useCase)}</h2>
        <p className="text-center text-gray-600 text-sm mb-8">
          Customize the questions your AI agent will ask during automated voice calls.
        </p>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className={question.label ? "mt-2" : ""}>
              {question.label && (
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{question.label}</h3>
              )}
              <Label htmlFor={question.id} className="block text-sm font-medium text-gray-700 mb-1">
                {question.label ? null : `Question ${index + 1}`}
              </Label>
              {question.type === "textarea" ? (
                <Textarea
                  id={question.id}
                  value={question.question}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder={question.placeholder}
                  className="w-full mt-1"
                  rows={4}
                />
              ) : (
                <Input
                  id={question.id}
                  type="text"
                  value={question.question}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder={question.placeholder}
                  className="w-full mt-1"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading} 
            className={`bg-black hover:bg-gray-800 text-white rounded px-6 py-3 text-base group transition-all duration-300 ease-in-ou ${isLoading ? 'cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Save and Continue
                <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  )
} 