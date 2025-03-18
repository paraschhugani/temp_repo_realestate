"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { ScriptEditor } from "@/components/script-editor/script-editor"
import { useAuth } from "@clerk/clerk-react"
import { OnboardingService } from "@/services/onboarding-service"
import ScriptNotFound from "./script-not-found"
import { scriptFormKey, StorageService } from "@/services/storage-service"

interface ScriptField {
  id: string
  label?: string
  question: string
  type: string
  placeholder: string
  category?: string
  required?: boolean
  value?: string
}

interface Script {
  id: string
  industry: string
  name: string
  value : string
  description: string
  fields: ScriptField[]
}

interface EditorScript {
  id: string
  industry: string
  "agent name": string
  description: string
  form: ScriptField[]
  value : string
}

interface Message {
  speaker: string
  content: string
  fieldId?: string
  placeholder?: string
}

interface Step {
  id: string
  messages: Message[]
  next?: string[]
}

interface Scenario {
  id: string
  title: string
  content?: Message[]
  tabName?: string
  description?: string
  steps: Step[]
}


// Backend response type
interface ScriptResponse {
  id: string
  name: string
  description: string
  industry: string
  fields: ScriptField[]
  scenarios: Scenario[]
  value : string
}

interface ScriptFormProps {
  useCase: string
  onSubmit?: () => void
}

export function ScriptForm({ useCase, onSubmit }: ScriptFormProps) {
  const [scriptData, setScriptData] = useState<Script | null>(null)
  const [scenarios, setScenarios] = useState<Scenario[] | null>(null)
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
          router.push(`/sign-in?redirect_url=/launch/${useCase}/form`)
          return
        }

        const token = await getToken()
        const onboardingService = new OnboardingService(
          process.env.NEXT_PUBLIC_BACKEND_URL || ""
        )
    
        const response = await onboardingService.getScript(useCase, token ?? "");
        let data: ScriptResponse
        if (typeof response === "string") {
          data = JSON.parse(response)
        } else {
          data = response
        }

        if (data && isMounted) {
          // Convert the response to our Script format
          const formattedScript: Script = {
            id: data.id,
            industry: data.industry,
            name: data.name,
            value : data.value,
            description: data.description,
            fields: data.fields || []
          }
          setScriptData(formattedScript)
          
          // Set scenarios directly as they're already in the correct format
          if (Array.isArray(data.scenarios)) {
            setScenarios(data.scenarios)
          } else {
            setScenarios([])
          }
        }
      } catch (error: any) {
        if (!isMounted) return

        if (error?.response?.status === 401) {
          router.push(`/sign-in?redirect_url=/launch/${useCase}/form`)
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

  const convertToEditorScript = (script: Script): EditorScript => {
    return {
      id: script.id,
      industry: script.industry,
      "agent name": script.name,
      description: script.description,
      form: script.fields.map(field => ({
        ...field,
        value: field.value || ""
      })),
      value: script.value
    }
  }

  const handleSave = (updatedScript: EditorScript, updatedScenarios: any): void => {
   
    const formattedScript: Script = {
      id: updatedScript.id,
      industry: updatedScript.industry,
      name: updatedScript["agent name"],
      value: updatedScript.value ?? "",
      description: updatedScript.description,
      fields: updatedScript.form.map(field => ({
        ...field,
        value: field.value || ""
      }))
    }
    
  
    setScriptData(formattedScript)
    
    // Convert scenarios to the format we're using internally (array)
    let scenariosArray: Scenario[] = []
    if (updatedScenarios) {
      if (Array.isArray(updatedScenarios)) {
        scenariosArray = updatedScenarios
      } else {
        // If it's an object of scenarios, convert to array
        scenariosArray = Object.values(updatedScenarios) as Scenario[]
      }
    }
    setScenarios(scenariosArray)

    // Save to local storage
    const dataToSave = {
      script: formattedScript,
      scenarios: scenariosArray,
    }
    StorageService.setItem(scriptFormKey, JSON.stringify(dataToSave))
  }

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true)
    try {
      if (scriptData && scenarios) {
        // Save current state before proceeding
        const dataToSave = {
          script: scriptData,
          scenarios: scenarios
        }

        StorageService.setItem(scriptFormKey, JSON.stringify(dataToSave))
      }

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

  // Add a function to load data from local storage
  useEffect(() => {
    const loadSavedData = () => {
      const savedData = StorageService.getItem(scriptFormKey)
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          if (parsedData.script) {
            setScriptData(parsedData.script)
          }
          if (parsedData.scenarios) {
            setScenarios(Array.isArray(parsedData.scenarios) ? parsedData.scenarios : Object.values(parsedData.scenarios))
          }
        } catch (error) {
          console.error('Error parsing saved data:', error)
        }
      }
    }

    // Try to load saved data if we don't have data yet
    if (!scriptData || !scenarios) {
      loadSavedData()
    }
  }, [])

  const formatUseCase = (str: string): string => {
    if (!str) return ""
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  if (isInitializing || isLoading || !scriptData || !scenarios) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (isNotFound) {
    return <ScriptNotFound />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {scriptData && scenarios && (
            <>
              <h1 className="text-3xl font-extrabold text-center mb-2">
                Configure Your AI Agent Script
              </h1>
              <h2 className="text-lg font-semibold text-center text-gray-600 mb-2">
                {scriptData.name} - {formatUseCase(useCase)}
              </h2>
              <p className="text-center text-gray-600 text-sm mb-8">
                {scriptData.description}
              </p>

              <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <ScriptEditor
                  script={convertToEditorScript(scriptData)}
                  scenarios={scenarios}
                  onSave={handleSave}
                  onContinue={handleSubmit}
                />
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
