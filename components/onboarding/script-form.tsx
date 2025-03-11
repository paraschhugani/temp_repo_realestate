"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAuth } from "@clerk/clerk-react"
import { OnboardingService } from "@/services/onboarding-service"
import ScriptNotFound from "./script-not-found"
import { scriptFormKey, StorageService } from "@/services/storage-service"

interface Question {
  id: string
  label?: string
  question: string
  type: "text" | "textarea"
  placeholder: string
}

interface ScriptFormProps {
  useCase: string
  onSubmit?: () => void
}

interface ScriptData {
  id: string
  industry: string
  "agent name": string
  description: string
  form: Question[]
}

export function ScriptForm({ useCase, onSubmit }: ScriptFormProps) {
  const [scriptData, setScriptData] = useState<ScriptData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)
  const router = useRouter()
  const { getToken, isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    let isMounted = true

    const fetchScript = async () => {
      try {
      
        if (!isLoaded) return

  
        if (isLoaded && !isSignedIn) {
          router.push('/sign-in')
          return
        }

        const token = await getToken()
        if (!token) {
          if (isMounted) {
            router.push('/sign-in')
          }
          return
        }

        const onboardingService = new OnboardingService(process.env.NEXT_PUBLIC_BACKEND_URL || '')
        const data = await onboardingService.getScript(useCase, token) as ScriptData
        
        if (data && isMounted) {
          setScriptData(data)
        }
      } catch (error: any) {
        if (!isMounted) return

        if (error?.response?.status === 401) {
          router.push('/sign-in')
        } else if (error?.response?.status === 404) {
          setIsNotFound(true)
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false)
        }
      }
    }

    fetchScript()

    return () => {
      isMounted = false
    }
  }, [useCase, getToken, router, isSignedIn, isLoaded])

  if(isNotFound) {
    return <ScriptNotFound />
  }


  const handleInputChange = (index: number, value: string) => {
    if (!scriptData) return

    const newForm = [...scriptData.form]
    newForm[index].question = value
    setScriptData({ ...scriptData, form: newForm })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      if (onSubmit) {
        onSubmit()
      } else {
        StorageService.setItem(scriptFormKey, JSON.stringify(scriptData))
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

  if (isInitializing) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (isNotFound) {
    return <ScriptNotFound />
  }

  if (!scriptData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">No script data available.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-extrabold text-center mb-2">Configure Your AI Agent Script</h1>
        <h2 className="text-lg font-semibold text-center text-gray-600 mb-2">
          {scriptData["agent name"]} - {formatUseCase(useCase)}
        </h2>
        <p className="text-center text-gray-600 text-sm mb-8">
          {scriptData.description}
        </p>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-6">
          {scriptData.form.map((question, index) => (
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
            className={`bg-black hover:bg-gray-800 text-white rounded px-6 py-3 text-base group transition-all duration-300 ease-in-out ${isLoading ? 'cursor-not-allowed' : ''}`}
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