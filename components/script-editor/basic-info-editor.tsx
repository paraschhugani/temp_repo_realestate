"use client"

import { ScriptField } from "./script-field"
import { ChatPreview } from "../chat/chat-preview"
import { useAudioPlayer } from "@/hooks/use-audio-player"

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
      <div className="flex items-center gap-2 mb-2">
        <p className="text-base text-gray-500">Configure the header of your script</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* <h3 className="text-lg font-medium text-gray-900">Edit Agent Responses</h3> */}
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

