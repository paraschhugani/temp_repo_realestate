"use client"

import { ScriptField } from "./script-field"
import { ChatPreview } from "../chat/chat-preview"
import { useAudioPlayer } from "@/hooks/use-audio-player"
import { VoiceConfigModal } from "../voice-config/voice-config-modal"
import { Volume2 } from "lucide-react"

interface Message {
  speaker: string
  content?: string
  fieldId?: string
  placeholder?: string
  label?: string
  question?: string
  type?: string
  value?: string
  response?: string
}

interface ScriptFieldType {
  id: string
  label?: string
  question?: string
  type?: string
  placeholder?: string
  category?: string
  required?: boolean
  description?: string
  value?: string
  messages?: Message[]
}

interface BasicInfoEditorProps {
  basicFields: ScriptFieldType[]
  values: Record<string, string>
  onChange: (id: string, value: string) => void
  voiceModelList: Record<string, any>
  voiceModel: string
  setVoiceModel: (voiceModel: string) => void
}

export function BasicInfoEditor({ basicFields, values, onChange, voiceModelList, voiceModel, setVoiceModel }: BasicInfoEditorProps) {
  const { handleAudioToggle, isSpeakerLoading, playingAudio } = useAudioPlayer(voiceModel);

  const selectedVoiceName = voiceModelList[voiceModel]?.name || "No voice selected";

  const allMessages = basicFields
    .filter(field => field.messages && field.messages.length > 0 && field.messages.filter((msg: Message) => msg.speaker === "customer").length > 0)
    .flatMap(field => 
      field.messages?.map(message => ({
        ...message,
        fieldId: field.id,
        content: message.speaker === "agent" 
          ? (values[field.id] || message.value || message.question || "") 
          : (message.response || "Customer response"),
      })) || []
    );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-base text-gray-500">Configure the header of your script</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2 py-1 border rounded-md text-sm text-gray-600">
            <Volume2 className="h-4 w-4" />
            <span className="truncate max-w-[150px]">{selectedVoiceName}</span>
          </div>
          <VoiceConfigModal
            voiceModelList={voiceModelList}
            voiceModel={voiceModel}
            setVoiceModel={setVoiceModel}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      Edit the agent responses for the basic info section
                    </div>
                  </div>
                </div>
          {basicFields.map((field) => (
            field.messages?.some(msg => msg.speaker === "agent") && (
              <ScriptField
                key={field.id}
                field={{
                  ...field,
                  type: "text",
                  placeholder: "Enter response",
                  label: field.messages?.find(m => m.speaker === "agent")?.label || field.label,
                  question: field.messages?.find(m => m.speaker === "agent")?.question || field.question || "",
                  required: field.required
                }}
                value={values[field.id] || ""}
                onChange={onChange}
              />
            )
          ))}
        </div>

        <ChatPreview
          messages={allMessages}
          onAudioToggle={handleAudioToggle}
          isSpeakerLoading={isSpeakerLoading}
          playingAudio={playingAudio}
          voiceModelList={voiceModelList}
          voiceModel={voiceModel}
          setVoiceModel={setVoiceModel}
        />
      </div>
    </div>
  )
}

