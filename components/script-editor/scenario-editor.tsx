"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScriptField } from "./script-field"
import { ChatPreview } from "../chat/chat-preview"
import { useAudioPlayer } from "@/hooks/use-audio-player"

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
  description?: string
  steps: Step[]
  tabName?: string
}

interface ScriptFieldType {
  id: string
  label?: string
  question: string
  type: string
  placeholder: string
  category?: string
  required?: boolean
  description?: string
}

interface ScenarioEditorProps {
  scenarios: Scenario[]
  scenarioFields: ScriptFieldType[]
  values: Record<string, Record<string, string>>
  onChange: (scenarioId: string, fieldId: string, value: string) => void
  voiceModelList: Record<string, any>
  voiceModel: string
  setVoiceModel: (voiceModel: string) => void
}

export function ScenarioEditor({ scenarios, scenarioFields, values, onChange, voiceModelList, voiceModel, setVoiceModel }: ScenarioEditorProps) {
  const [activeScenario, setActiveScenario] = useState<string>("")
  const { handleAudioToggle, isSpeakerLoading, playingAudio } = useAudioPlayer(voiceModel);

  useEffect(() => {
    if (scenarios && scenarios.length > 0) {
      setActiveScenario(scenarios[0].id)
    }
  }, [scenarios])

  // Don't render if we don't have the required data
  if (!Array.isArray(scenarios) || !Array.isArray(scenarioFields) || scenarios.length === 0) {
    console.error("Missing required data:", {
      scenariosArray: Array.isArray(scenarios),
      scenarioFieldsArray: Array.isArray(scenarioFields),
      scenariosLength: scenarios?.length || 0,
      scenarioFieldsLength: scenarioFields?.length || 0
    })
    return null
  }

  // Get all messages from all steps for a scenario
  const getScenarioMessages = (scenario: Scenario): Message[] => {
    if (!scenario.steps || !Array.isArray(scenario.steps)) {
      console.error("Scenario steps missing or not an array:", scenario)
      return []
    }
    
    const allMessages: Message[] = []
    scenario.steps.forEach((step, index) => {
      if (step.messages && Array.isArray(step.messages)) {
        allMessages.push(...step.messages)
      }
    })
    
    return allMessages
  }

  // Get updated content based on the field and value
  const getUpdatedContent = (scenario: Scenario): Message[] => {
    const messages = getScenarioMessages(scenario)
    return messages.map((message) => {
      if (message.speaker === "agent" && message.fieldId) {
        const value = values[scenario.id]?.[message.fieldId]
        if (value) {
          return { ...message, content: value }
        }
      }
      return message
    })
  }



  const formatFieldName = (fieldName: string) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }


  return (
    <div className="space-y-2 mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Scenario Scripts</h2>
      <p className="text-sm text-gray-600">Edit how your agent responds in different conversation scenarios.</p>

      <style jsx global>{`
        .tabs-scrollable::-webkit-scrollbar {
          display: none;
        }
        .tabs-scrollable {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @media (max-width: 640px) {
          .responsive-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Tabs value={activeScenario} onValueChange={setActiveScenario} className="w-full">
        <div className="relative w-full mb-6">
          <div className="overflow-x-auto tabs-scrollable">
            <TabsList className="inline-flex min-w-full">
              {scenarios.map((scenario) => (
                <TabsTrigger key={scenario.id} value={scenario.id} className="text-sm whitespace-nowrap">
                  {scenario.tabName || scenario.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {scenarios.map((scenario) => (
          <TabsContent key={scenario.id} value={scenario.id} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-grid">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Edit Agent Responses</h3>
                  <div className="relative flex items-center group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16" 
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4"/>
                      <path d="M12 8h.01"/>
                    </svg>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-xs text-white rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      {scenario.description}
                    </div>
                  </div>
                </div>

                {getScenarioMessages(scenario)
                  .filter(msg => msg.speaker === "agent" && msg.fieldId)
                  .map((message : any, index) => {
                    const field = scenarioFields.find(f => f.id === message.fieldId)
                  
                    const label = field ? formatFieldName(field.label || field.question) : (message.label || "Response")
                     console.log("label",label)
                    return (
                      <ScriptField
                        key={`${scenario.id}-${message.fieldId || index}`}
                        field={{
                          id: message.fieldId || `field-${index}`,
                          label: formatFieldName(label),
                          question: "",
                          type: "text",
                          placeholder: message.placeholder || "Enter agent's response"
                        }}
                        value={values[scenario.id]?.[message.fieldId || ""] || message.content || ""}
                        onChange={(fieldId, value) => onChange(scenario.id, fieldId, value)}
                      />
                    )
                  })}
              </div>

              <ChatPreview 
                messages={getUpdatedContent(scenario)} 
                onAudioToggle={handleAudioToggle}
                isSpeakerLoading={isSpeakerLoading}
                playingAudio={playingAudio}
                voiceModelList={voiceModelList}
                voiceModel={voiceModel}
                setVoiceModel={setVoiceModel}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

