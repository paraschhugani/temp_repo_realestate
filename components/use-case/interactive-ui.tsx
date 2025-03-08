"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Phone, UserCheck, Home, Activity } from "lucide-react"

interface InteractiveUIProps {
  industry: string
  useCase: string
}

const HealthAppointmentReminder: React.FC = () => {
  const [step, setStep] = useState(0)
  const steps = [
    { text: "AI: Hello! This is a reminder for your appointment tomorrow at 2 PM.", type: "ai" },
    { text: "Patient: Thank you for the reminder.", type: "user" },
    { text: "AI: Would you like to confirm or reschedule?", type: "ai" },
    { text: "Patient: I'd like to confirm.", type: "user" },
    {
      text: "AI: Great! Your appointment is confirmed for tomorrow at 2 PM. We look forward to seeing you.",
      type: "ai",
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [step])

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
      <div className="flex items-center mb-4">
        <Phone className="h-6 w-6 text-blue-500 mr-2" />
        <span className="font-semibold">AI Appointment Reminder</span>
      </div>
      <div className="space-y-3 h-64 overflow-y-auto">
        {steps.slice(0, step + 1).map((s, index) => (
          <div key={index} className={`p-3 rounded-lg ${s.type === "ai" ? "bg-blue-100" : "bg-gray-100"}`}>
            <p className="text-sm">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

const HealthTelehealth: React.FC = () => {
  const [step, setStep] = useState(0)
  const steps = [
    {
      text: "AI: Hello! I'm calling to conduct a pre-screening for your upcoming telehealth appointment. Do you have a few minutes?",
      type: "ai",
    },
    { text: "Patient: Yes, I do.", type: "user" },
    { text: "AI: Great. First, do you have a fever?", type: "ai" },
    { text: "Patient: No, I don't have a fever.", type: "user" },
    { text: "AI: Okay. On a scale of 1-10, how would you rate your current pain level?", type: "ai" },
    { text: "Patient: I'd say about a 3.", type: "user" },
    {
      text: "AI: Thank you. Based on your responses, your appointment will proceed as scheduled. Is there anything else you'd like to add?",
      type: "ai",
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [step])

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
      <div className="flex items-center mb-4">
        <Activity className="h-6 w-6 text-red-500 mr-2" />
        <span className="font-semibold">AI Telehealth Triage</span>
      </div>
      <div className="space-y-3 h-64 overflow-y-auto">
        {steps.slice(0, step + 1).map((s, index) => (
          <div key={index} className={`p-3 rounded-lg ${s.type === "ai" ? "bg-red-100" : "bg-gray-100"}`}>
            <p className="text-sm">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

const MortgageLoanPreQualification: React.FC = () => {
  const [step, setStep] = useState(0)
  const steps = [
    { text: "AI: Hello! I'm calling to help with your loan pre-qualification. Is now a good time?", type: "ai" },
    { text: "Client: Yes, it is.", type: "user" },
    { text: "AI: Great. What's your annual income?", type: "ai" },
    { text: "Client: My annual income is $75,000.", type: "user" },
    { text: "AI: Thank you. And what's your credit score range?", type: "ai" },
    { text: "Client: It's in the 700-750 range.", type: "user" },
    {
      text: "AI: Excellent. Based on this information, you may qualify for our standard mortgage products. Would you like to speak with a loan officer for more details?",
      type: "ai",
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [step])

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
      <div className="flex items-center mb-4">
        <Home className="h-6 w-6 text-green-500 mr-2" />
        <span className="font-semibold">AI Loan Pre-Qualification</span>
      </div>
      <div className="space-y-3 h-64 overflow-y-auto">
        {steps.slice(0, step + 1).map((s, index) => (
          <div key={index} className={`p-3 rounded-lg ${s.type === "ai" ? "bg-green-100" : "bg-gray-100"}`}>
            <p className="text-sm">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

const RecruitmentCandidateScreening: React.FC = () => {
  const [step, setStep] = useState(0)
  const steps = [
    {
      text: "AI: Hello! I'm calling to conduct an initial screening for the software developer position. Is now a good time?",
      type: "ai",
    },
    { text: "Candidate: Yes, it is.", type: "user" },
    { text: "AI: Great. What's your experience level with React?", type: "ai" },
    { text: "Candidate: I have 3 years of experience with React.", type: "user" },
    { text: "AI: Excellent. Are you available for remote work?", type: "ai" },
    { text: "Candidate: Yes, I am.", type: "user" },
    {
      text: "AI: Thank you for your responses. Based on this initial screening, you seem to be a good fit. Would you like to schedule an interview with our hiring manager?",
      type: "ai",
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [step])

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
      <div className="flex items-center mb-4">
        <UserCheck className="h-6 w-6 text-purple-500 mr-2" />
        <span className="font-semibold">AI Candidate Screening</span>
      </div>
      <div className="space-y-3 h-64 overflow-y-auto">
        {steps.slice(0, step + 1).map((s, index) => (
          <div key={index} className={`p-3 rounded-lg ${s.type === "ai" ? "bg-purple-100" : "bg-gray-100"}`}>
            <p className="text-sm">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

const RealEstatePropertyInquiry: React.FC = () => {
  const [step, setStep] = useState(0)
  const steps = [
    {
      text: "AI: Hello! I'm calling about the property inquiry you submitted. Is now a good time to discuss?",
      type: "ai",
    },
    { text: "Client: Yes, it is.", type: "user" },
    {
      text: "AI: Great. The property you inquired about is a 3-bedroom house in downtown. Would you like to schedule a virtual tour?",
      type: "ai",
    },
    { text: "Client: Yes, I would.", type: "user" },
    {
      text: "AI: Excellent. We have availability tomorrow at 2 PM or Friday at 11 AM. Which would you prefer?",
      type: "ai",
    },
    { text: "Client: Tomorrow at 2 PM works for me.", type: "user" },
    {
      text: "AI: Perfect. I've scheduled your virtual tour for tomorrow at 2 PM. You'll receive an email with the link. Is there anything else you'd like to know about the property?",
      type: "ai",
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [step])

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
      <div className="flex items-center mb-4">
        <Home className="h-6 w-6 text-orange-500 mr-2" />
        <span className="font-semibold">AI Property Inquiry</span>
      </div>
      <div className="space-y-3 h-64 overflow-y-auto">
        {steps.slice(0, step + 1).map((s, index) => (
          <div key={index} className={`p-3 rounded-lg ${s.type === "ai" ? "bg-orange-100" : "bg-gray-100"}`}>
            <p className="text-sm">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

const FitnessCoaching: React.FC = () => {
  const [step, setStep] = useState(0)
  const steps = [
    { text: "AI: Hello! This is your AI fitness coach. How are you feeling after yesterday's workout?", type: "ai" },
    { text: "Client: I'm feeling good, thanks!", type: "user" },
    { text: "AI: That's great to hear! How many push-ups were you able to do?", type: "ai" },
    { text: "Client: I managed to do 20 push-ups.", type: "user" },
    {
      text: "AI: Excellent progress! Let's set a goal to increase that by 10% for your next workout. Does that sound achievable?",
      type: "ai",
    },
    { text: "Client: Yes, that sounds achievable.", type: "user" },
    {
      text: "AI: Great! I'll update your workout plan. Remember to stay hydrated and get enough rest. Is there anything else you'd like to discuss about your fitness journey?",
      type: "ai",
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [step])

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
      <div className="flex items-center mb-4">
        <Activity className="h-6 w-6 text-red-500 mr-2" />
        <span className="font-semibold">AI Fitness Coach</span>
      </div>
      <div className="space-y-3 h-64 overflow-y-auto">
        {steps.slice(0, step + 1).map((s, index) => (
          <div key={index} className={`p-3 rounded-lg ${s.type === "ai" ? "bg-red-100" : "bg-gray-100"}`}>
            <p className="text-sm">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

const SaaSMeetingConfirmation: React.FC = () => {
  const [step, setStep] = useState(0)
  const steps = [
    {
      text: "AI: Hello! This is an automated call to confirm your meeting with TechFlow SaaS tomorrow at 2 PM. Is this still convenient for you?",
      type: "ai",
    },
    { text: "Client: Yes, that works for me.", type: "user" },
    {
      text: "AI: Great! Do you have any specific topics you'd like to discuss or any questions before the meeting?",
      type: "ai",
    },
    { text: "Client: I'd like to discuss pricing options for our team.", type: "user" },
    {
      text: "AI: I've noted that you'd like to discuss pricing options. I'll make sure the team is prepared for this topic. Is there anything else you need?",
      type: "ai",
    },
    { text: "Client: No, that's all. Thank you!", type: "user" },
    { text: "AI: You're welcome! We look forward to meeting with you tomorrow at 2 PM. Have a great day!", type: "ai" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [step])

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
      <div className="flex items-center mb-4">
        <Phone className="h-6 w-6 text-indigo-500 mr-2" />
        <span className="font-semibold">AI Meeting Confirmation</span>
      </div>
      <div className="space-y-3 h-64 overflow-y-auto">
        {steps.slice(0, step + 1).map((s, index) => (
          <div key={index} className={`p-3 rounded-lg ${s.type === "ai" ? "bg-indigo-100" : "bg-gray-100"}`}>
            <p className="text-sm">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default function InteractiveUI({ industry, useCase }: InteractiveUIProps) {
  switch (industry) {
    case "health":
      return useCase === "automated-appointment-reminders" ? <HealthAppointmentReminder /> : <HealthTelehealth />
    case "mortgage":
      return <MortgageLoanPreQualification />
    case "recruitment":
      return <RecruitmentCandidateScreening />
    case "real-estate":
      return <RealEstatePropertyInquiry />
    case "fitness":
      return <FitnessCoaching />
    case "saas":
      return <SaaSMeetingConfirmation />
    default:
      return <div>No interactive UI available for this use case.</div>
  }
}

