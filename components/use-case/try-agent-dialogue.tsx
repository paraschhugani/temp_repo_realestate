"use client"

import { useMemo, useState } from "react"
import { X, CheckCircle, AlertCircle, Phone, User, Mail, Globe } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import SelectedVoiceModelComponent, { VoiceConfigModal } from "../dialogues/voice-config-modal"
import { toastService } from "@/services/toast-service"
import { CampaignService } from "@/services/campaign-service"


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  companyWebsite: z.string(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
})

type FormData = z.infer<typeof formSchema>

interface TryAgentModalProps {
  isOpen: boolean
  onClose: () => void
  useCase: string
  selectedVoiceName: string
  voiceModel: string
  voiceModelList: Record<string, any>
  setVoiceModel: (voiceModel: string) => void
}

export default function TryAgentModal({
  isOpen,
  onClose,
  useCase,
  selectedVoiceName,
  voiceModel,
  voiceModelList,
  setVoiceModel,
}: TryAgentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const campaignService = useMemo(() => new CampaignService(), []);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  })


  const handleTestAgent = async (data: FormData) => {
    const { phone, name } = data
    if(selectedVoiceName == "No voice selected"){
      toastService.error("Please select a voice model")
      return;
    }
    if (!voiceModel) {

      toastService.error("Please select a voice model")
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
   
    try {
      await campaignService.launchDemoCampaign({
        phone_number: phone,
        voiceModel: voiceModel,
        voiceSpeed: 1, 
        backgroundSound: false, 
        token: "demo_user_token",
        userID: "demo_user",
        useCase: useCase,
        assistant_name: name, 
      })
      
    } catch (error) {
      
      throw error
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await handleTestAgent(data).then(()=>{
        console.log("Form data submitted:", data)
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
          onClose()
        }, 3000)
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formateUseCase = (usecase: string) => {
    return usecase.replaceAll("-", " ")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 overflow-hidden relative z-10 transform transition-all duration-500 ease-out"
        style={{
          animation: "modal-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-10"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>

          <h2 className="text-2xl font-bold mb-1 relative z-10">Try Our AI Agent</h2>
          <p className="text-blue-100 relative z-10">
            Experience how our {formateUseCase(useCase)} agent can transform your business
          </p>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
              <p className="text-gray-600 mb-4">
                Our AI agent will call you shortly. Thank you for your interest!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Smith"
                      className={`pl-10 w-full text-sm rounded-md border ${
                        errors.name
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      } py-2 px-3 focus:outline-none focus:ring-2 transition-all duration-200`}
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      className={`pl-10 w-full text-sm rounded-md border ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      } py-2 px-3 focus:outline-none focus:ring-2 transition-all duration-200`}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Website field */}
                <div>
                  <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Globe size={18} />
                    </div>
                    <input
                      id="companyWebsite"
                      type="text"
                      placeholder="https://company.com"
                      className={`pl-10 w-full text-sm rounded-md border ${
                        errors.companyWebsite
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      } py-2 px-3 focus:outline-none focus:ring-2 transition-all duration-200`}
                      {...register("companyWebsite")}
                    />
                  </div>
                  {errors.companyWebsite && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.companyWebsite.message}
                    </p>
                  )}
                </div>

                {/* Phone Number field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Phone size={18} />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="9191919191"
                      className={`pl-10 text-sm w-full rounded-md border ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      } py-2 px-3 focus:outline-none focus:ring-2 transition-all duration-200`}
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <SelectedVoiceModelComponent
                  selectedVoiceName={selectedVoiceName}
                  selectedVoiceID={voiceModel}
                />
                <VoiceConfigModal
                  voiceModelList={voiceModelList}
                  voiceModel={voiceModel}
                  setVoiceModel={setVoiceModel}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Test Agent"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
